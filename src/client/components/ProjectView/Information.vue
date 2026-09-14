<script setup lang="ts">
import type * as project from "@common/project";
import EditButton from "./EditButton.vue";
import DownloadPanel from "./DownloadPanel.vue";

const props = defineProps<{
    data: project.fetch.Result;
}>();
</script>

<template>
    <div class="main">
        <div class="header">
            <div>
                <h1>{{ data.title }}</h1>
                <p>{{ data.author }}</p>
            </div>
            <div class="spacer" />
            <DownloadPanel :data="data" />
        </div>
        <div class="tags">
            <p v-for="tag in data.tags">{{ tag }}</p>
        </div>
        <div class="desc">{{ data.description }}</div>
        <EditButton
            v-if="data.editable"
            :author="data.author"
            :slug="data.slug"
        />
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

.header {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.spacer {
    display: none;
}

@media (min-width: 600px) {
    .header {
        flex-direction: row;
    }

    .spacer {
        display: block;
        flex: 1;
    }
}

.tags {
    display: flex;

    p {
        padding-left: 10px;
    }
}
</style>
