<script setup lang="ts">
import { useRoute } from "vue-router";
import * as project from "@common/project";
import NotFound from "@/components/ProjectView/NotFound.vue";
import { isTRPCError, trpc } from "@/index";
import ContentColumn from "@/components/ContentColumn.vue";
import Bapi from "@/components/Bapi.vue";
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
let unlisted: Ref<boolean> = ref(fetchResult.unlisted);

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

async function setUnlisted(unlistedTo: boolean) {
    await trpc.project.update.mutate({
        action: "setUnlisted",
        author: fetchResult.author,
        slug: fetchResult.slug,
        unlistedTo,
    });

    unlisted.value = unlistedTo;
}

const file = ref<File | null>(null);
const fileStatus = ref("");
const fileBusy = ref(false);

function onFileChange(event: Event) {
    file.value = (event.target as HTMLInputElement).files?.[0] ?? null;
}

async function uploadFile() {
    if (!file.value || fileBusy.value) return;
    fileBusy.value = true;
    fileStatus.value = "uploading...";

    const fd = new FormData();
    fd.append("author", fetchResult.author);
    fd.append("projectSlug", fetchResult.slug);
    fd.append("file", file.value);

    try {
        await trpc.project.upload.mutate(fd);
        fileStatus.value = "uploaded";
    } catch (err) {
        fileStatus.value = `error: ${(err as Error).message}`;
    } finally {
        fileBusy.value = false;
    }
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

        <div class="boxed" style="display: flex; gap: 8px">
            <h1>Big Important Section</h1>
            <Bapi v-if="unlisted" @click="setUnlisted(false)"
                >list project</Bapi
            >
            <Bapi v-else @click="setUnlisted(true)">unlist project</Bapi>
        </div>

        <div class="boxed">
            <h1>Uploading</h1>

            <div style="display: flex">
                <p>file:</p>
                <input type="file" @change="onFileChange" />
            </div>

            <Bapi @click="uploadFile">upload file</Bapi>

            <p class="status">{{ fileStatus }}</p>
        </div>
    </ContentColumn>
</template>

<style scoped>
input {
    width: 100%;
}

.boxed {
    background-color: #1c1e24;
    color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
}

.status {
    white-space: pre-wrap;
}
</style>
