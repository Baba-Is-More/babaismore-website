<script setup lang="ts">
import { trpc } from "@/index";
import { ref, type Ref } from "vue";

const value: Ref<number> = ref(0);

function sent() {
    console.log(value.value);
    if (!value.value) return;
    trpc.project.starRate.mutate({
        count: value.value,
        project: "bark",
        author: "iamkeke",
        user: "babaisyou",
    });
}
</script>
<template>
    <input type="number" v-model.number="value" />
    <button @click="sent">go!</button>
</template>
