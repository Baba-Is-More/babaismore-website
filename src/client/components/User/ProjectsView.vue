<script setup lang="ts">
import { ref, watch } from "vue";
import ViewButtons from "./ViewButtons.vue";
import { trpc } from "@/index";
import type * as user from "@common/users";
import Project from "./Project.vue";

enum Tabs {
    Public,
    Unlisted,
}

const TabNames: Record<Tabs, string> = {
    [Tabs.Public]: "public",
    [Tabs.Unlisted]: "unlisted",
};

const props = defineProps<{
    username: string;
}>();

const activeTab = ref<Tabs>(Tabs.Public);
const projects = ref<user.projects.ResultItem[]>([]);
const loading = ref(false);
const error = ref(false);

async function fetchProjects() {
    loading.value = true;
    error.value = false;

    try {
        const result = await trpc.user.projects.query({
            username: props.username,
            visibility: activeTab.value === Tabs.Public ? "public" : "unlisted",
            page: 0,
        });
        // i otta get superjson...
        projects.value = result.projects.map((project) => ({
            ...project,
            posted: new Date(project.posted),
        }));
    } catch (e) {
        error.value = true;
    } finally {
        loading.value = false;
    }
}

watch(activeTab, fetchProjects, { immediate: true });
</script>

<template>
    <div>
        <ViewButtons
            v-model="activeTab"
            :tabs="[Tabs.Public, Tabs.Unlisted]"
            :tab-labels="TabNames"
        />

        <div v-if="loading">loading...</div>
        <div v-else-if="error">failed to load projects.</div>
        <div v-else-if="projects.length == 0">no projects here <:3</div>
        <div v-else>
            <Project
                v-for="project in projects"
                :key="project.slug"
                :data="project"
            />
        </div>
    </div>
</template>

<style scoped></style>
