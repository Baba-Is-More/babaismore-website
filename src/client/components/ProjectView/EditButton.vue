<script setup lang="ts">
import Babu from "../Babu.vue";

const props = defineProps<{
    author: string;
    slug: string;
}>();
</script>

<template>
    <a :href="`/edit/${author}/${slug}`">
        <Babu>edit</Babu>
    </a>
</template>

<style scoped>
a {
    color: inherit;
    text-decoration: inherit;
}
</style>
