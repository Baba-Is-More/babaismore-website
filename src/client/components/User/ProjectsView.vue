<script setup lang="ts">
import { ref } from "vue";
import ViewButtons from "./ViewButtons.vue";

enum Tabs {
    Public,
    Unlisted,
}

const TabNames: Record<Tabs, string> = {
    [Tabs.Public]: "public",
    [Tabs.Unlisted]: "unlisted",
};

const activeTab = ref<Tabs>(Tabs.Public);
</script>

<template>
    <ViewButtons
        v-model="activeTab"
        :tabs="[Tabs.Public, Tabs.Unlisted]"
        :tab-labels="TabNames"
    />
</template>

<style scoped></style>
