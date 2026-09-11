<script setup lang="ts">
import { useRoute } from "vue-router";
import * as project from "@common/project";
import NotFound from "@/components/ProjectView/NotFound.vue";
import { isTRPCError, trpc } from "@/index";
import ContentColumn from "@/components/ContentColumn.vue";
import router from "@/router";
import { ref, type Ref } from "vue";

const route = useRoute();

const author = route.params.author as string;
const projectSlug = route.params.project as string;

let fetchResult: project.fetch.Result;

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

    // todo
    throw error;
}

// of course, this doesnt fully protect the backend,
// it still needs to auth, but it helps scattered users!
if (!fetchResult.editable) {
    await router.replace(`/project/${author}/${projectSlug}`);
}

let projectName: Ref<string> = ref(fetchResult.title);
let slug: Ref<string> = ref(fetchResult.slug);
let description: Ref<string> = ref(fetchResult.description);
let summary: Ref<string> = ref(fetchResult.summary);

function is_upload_blocked(): boolean {
    const name_is_new = projectName.value != fetchResult.title;
    const slug_is_new = slug.value != fetchResult.slug;
    const description_is_new = description.value != fetchResult.description;
    const summary_is_new = summary.value != fetchResult.summary;

    const is_allowed =
        name_is_new || slug_is_new || description_is_new || summary_is_new;

    return !is_allowed;
}

async function upload() {
    const edited: project.fetch.Result = {
        ...fetchResult,
        title: projectName.value,
        slug: slug.value,
        description: description.value,
        summary: summary.value,
    };

    const query = project.update.utils.fromFetchResult(edited, fetchResult);
    await trpc.project.update.mutate(query);

    await router.push(`/edit/${author}/${slug.value}`);
}
</script>

<template>
    <ContentColumn>
        <div class="boxed">
            <h1>minor changes:</h1>
            <div style="display: flex">
                <div>
                    <p>project name:</p>
                    <input v-model="projectName" />
                </div>
                <div style="flex: 1" />
                <div>
                    <p>project slug:</p>
                    <input v-model="slug" />
                </div>
                <div style="flex: 1" />
            </div>

            <p>project author: {{ fetchResult.author }}</p>
            <p>
                project tags:
                <span
                    style="margin-right: 8px"
                    v-for="tag in fetchResult.tags"
                    >{{ tag }}</span
                >
            </p>

            <div>
                <div>
                    <p>project description:</p>
                    <input v-model="description" />
                </div>

                <div>
                    <p>project summary:</p>
                    <input v-model="summary" />
                </div>
            </div>

            <button :disabled="is_upload_blocked()" @click="upload">
                save changes
            </button>
        </div>
    </ContentColumn>
</template>

<style scoped>
input {
    color: black;
    width: 100%;
}

.boxed {
    background-color: #1c1e24;
    color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
}
</style>
