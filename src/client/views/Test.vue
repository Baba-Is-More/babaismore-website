<script setup lang="ts">
import { reactive, ref, unref } from 'vue';
import { trpc } from '..';
import { Project } from '@server/models';

var projectName = ref("")
var thumbnailURL = ref("")
var projectDesc = ref("")
var downloads = ref(3)
var summary = ref("")

function create() {
    console.log("yeah")
    trpc.project.newProject.mutate({
        downloads: unref(downloads),
        projectDesc: unref(projectDesc),
        projectName: unref(projectName),
        thumbnailURL: unref(thumbnailURL),
        summary: unref(summary),
    })
}
</script>

<template>
    <input v-model="projectName" placeholder = "name" />
    <input v-model="thumbnailURL" placeholder = "thumb" />
    <input v-model="projectDesc" placeholder = "desc" />
    <input v-model="downloads" type="number" placeholder = "downloads" />
    <input v-model="summary" placeholder = "summary" />
    <button @click="create"> make! </button>
</template>

<style scoped>
h1,
p {
	color: white
}
</style>
