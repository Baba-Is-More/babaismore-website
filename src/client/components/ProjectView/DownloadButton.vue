<script setup lang="ts">
import { RouterLink } from "vue-router";
import Bage from "../Bage.vue";

const props = defineProps<{
    author: string;
    slug: string;
}>();
</script>

<template>
    <RouterLink :to="`/project/${author}/${slug}/latest`" class="link">
        <Bage>Download</Bage>
    </RouterLink>
</template>

<style scoped>
.link {
    text-decoration: none;
}
</style>
