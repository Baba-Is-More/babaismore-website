<script setup lang="ts">
import { computed, toRefs, watch, type ComputedRef, type Ref } from "vue";

const props = defineProps<{ count: number }>();
const { count } = toRefs(props);

function src_from_count(count: number): string {
    if (count == 0) return "/gifs/zero.webp";
    if (count == 1) return "/gifs/one.webp";
    if (count == 2) return "/gifs/two.webp";
    if (count == 3) return "/gifs/three.webp";
    if (count == 4) return "/gifs/four.webp";
    if (count == 5) return "/gifs/five.webp";
    throw "unexpected star count";
}

function alt_from_count(count: number): string {
    if (count == 0) return "project has zero stars";
    if (count == 1) return "project has one stars";
    if (count == 2) return "project has two stars";
    if (count == 3) return "project has three stars";
    if (count == 4) return "project has four stars";
    if (count == 5) return "project has five stars";
    throw "unexpected star count";
}

const img_src: ComputedRef<string> = computed(() =>
    src_from_count(Math.round(count.value)),
);
const img_alt: ComputedRef<string> = computed(() =>
    alt_from_count(Math.round(count.value)),
);
</script>

<template>
    <img :src="img_src" :alt="img_alt" />
</template>

<style scoped>
.img {
    width: 100%;
    height: auto;
}
</style>
