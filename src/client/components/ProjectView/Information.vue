<script setup lang="ts">
import type * as project from "@common/project";

const props = defineProps<{
    data: project.fetch.Result;
}>();
</script>

<template>
    <div class="main">
        <h1>{{ data.title }}</h1>
        <p>{{ data.author }}</p>
        <div class="tags">
            <p v-for="tag in data.tags">{{ tag }}</p>
        </div>
    </div>
</template>

<style scoped>
.main {
    background-color: #1c1e24;
    color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
}

.tags {
    display: flex;

    p {
        padding-left: 10px;
    }
}
</style>
