<script setup lang="ts">
import type * as project from "@common/project";
import DownloadButton from "./DownloadButton.vue";

const props = defineProps<{
    data: project.fetch.Result;
}>();
</script>

<template>
    <div class="panel">
        <DownloadButton :author="data.author" :slug="data.slug" />
        <a :href="`/project/${data.author}/${data.slug}/files`">more files</a>
    </div>
</template>

<style scoped>
.panel {
    padding-left: 10px;
}

@media (min-width: 600px) {
    .panel {
        border-left: 1px solid #3a3d47;
    }
}
</style>
