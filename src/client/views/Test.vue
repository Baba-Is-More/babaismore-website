<script setup lang="ts">
import { reactive, ref, unref } from "vue";
import { trpc } from "..";
import { Project } from "@server/models";

let author = ref("");
let projectName = ref("");
let thumbnailURL = ref("");
let projectDesc = ref("");
let downloads = ref(3);
let summary = ref("");
let posted = ref(new Date());

function create() {
    trpc.project.newProject.mutate({
        author: unref(author),
        downloads: unref(downloads),
        projectDesc: unref(projectDesc),
        projectName: unref(projectName),
        thumbnailURL: unref(thumbnailURL),
        summary: unref(summary),
        posted: unref(posted),
    });
}
</script>

<template>
    <input v-model="author" placeholder="author" />
    <input v-model="projectName" placeholder="name" />
    <input v-model="thumbnailURL" placeholder="thumb" />
    <input v-model="projectDesc" placeholder="desc" />
    <input v-model="downloads" type="number" placeholder="downloads" />
    <input v-model="summary" placeholder="summary" />
    <input v-model="posted" type="date" />
    <button @click="create">make!</button>
</template>

<style scoped>
h1,
p {
    color: white;
}
</style>
