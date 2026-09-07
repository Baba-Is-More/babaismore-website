<script setup lang="ts">
import { useRoute } from "vue-router";
import type * as project from "@common/project";
import NotFound from "@/components/ProjectView/NotFound.vue";
import { isTRPCError, trpc } from "@/index";
import ContentColumn from "@/components/ContentColumn.vue";

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
}
</script>

<template>
    <ContentColumn>
        <div v-if="fetchResult">
            <p>editing it ahsdghsdhg</p>
        </div>
        <div v-else>
            <NotFound />
        </div>
    </ContentColumn>
</template>
