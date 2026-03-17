<script setup lang="ts">
const props = defineProps<{
    image: string;
}>();
</script>

<template>
    <img :src="`/uploads/gallery/${image}.png`" />
</template>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>
