<script setup lang="ts">
import ContentColumn from "@/components/ContentColumn.vue";
import NotFound from "@/components/ProjectView/NotFound.vue";
import { useRoute } from "vue-router";
import { isTRPCError, trpc } from "@/index";
import type * as project from "@common/project";

const route = useRoute();

const author = route.params.author as string;
const projectSlug = route.params.project as string;

let fetchResult: project.files.getLatest.Result | null = null;

try {
    const raw = await trpc.project.files.getLatest.query({
        author: author,
        slug: projectSlug,
    });
    fetchResult = { ...raw, fileDate: new Date(raw.fileDate) };

    window.location.href = `/download/${author}/${projectSlug}/${fetchResult.fileName}`;
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
</script>

<template>
    <ContentColumn>
        <div v-if="fetchResult">downloading {{ fetchResult.version }}...</div>
        <div v-else>
            <NotFound />
        </div>
    </ContentColumn>
</template>
