<script setup lang="ts">
import StarRating from "./StarRating.vue";
import type { FetchResult } from "@common/fetch/FetchResult";

const props = defineProps<{
    data: FetchResult;
}>();
</script>

<template>
    <div class="main">
        <h1>{{ data.title }}</h1>
        <p>{{ data.author }}</p>
        <div class="tags">
            <p v-for="tag in data.tags">{{ tag }}</p>
        </div>
        <StarRating :count="data.starCount" />
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
