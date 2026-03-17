<script setup lang="ts">
import TopImages from "@/components/ProjectView/TopImages.vue";
import { useRoute } from "vue-router";
import { trpc } from "..";

const route = useRoute();

const author = route.params.author as string;
const project = route.params.project as string;

const fetchResult = await trpc.project.fetch.query({
    author: author,
    project: project,
});
</script>

<template>
    <div id="main">
        <TopImages />
        <p>{{ fetchResult.description }}</p>
    </div>
</template>

<style scoped>
h1,
p {
    color: white;
}

#main {
    width: 80%;
    height: 1000px;
    background-color: #293141;
    margin-left: 10%;
}
</style>
