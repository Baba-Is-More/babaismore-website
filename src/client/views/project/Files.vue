<script setup lang="ts">
import ContentColumn from "@/components/ContentColumn.vue";
import NotFound from "@/components/ProjectView/NotFound.vue";
import FileDownloadRow from "@/components/ProjectView/FileDownloadRow.vue";
import { useRoute } from "vue-router";
import { isTRPCError, trpc } from "@/index";
import type * as project from "@common/project";

const route = useRoute();

const author = route.params.author as string;
const projectSlug = route.params.project as string;

let fetchResult: project.fetch.Result | null = null;

try {
    fetchResult = await trpc.project.fetch.query({
        author: author,
        slug: projectSlug,
    });
} catch (error) {
    if (!isTRPCError(error)) {
        throw error;
    }

    if (error.data?.code != "NOT_FOUND") {
        throw error;
    }

    // error is not found, we can chill (or handle it later i dunno)
    // currently its handled by the v-else block so if i change it
    // pleaseeeeee change this comment
}

let filesResult: project.files.getAll.Result | null = null;

if (fetchResult) {
    const raw = await trpc.project.files.getAll.query({
        author: author,
        slug: projectSlug,
        page: 0,
    });
    filesResult = {
        ...raw,
        files: raw.files.map((file) => ({
            ...file,
            fileDate: new Date(file.fileDate),
        })),
    };
}
</script>

<template>
    <ContentColumn>
        <div v-if="fetchResult">
            <h1 class="center">Versions for {{ fetchResult.title }}</h1>
            <div>
                <FileDownloadRow
                    v-for="file in filesResult?.files"
                    :key="file.version"
                    :author="fetchResult.author"
                    :slug="fetchResult.slug"
                    :file="file"
                    :editable="fetchResult.editable"
                />
            </div>
        </div>
        <div v-else>
            <NotFound />
        </div>
    </ContentColumn>
</template>

<style scoped>
.center {
    text-align: center;
}
</style>
