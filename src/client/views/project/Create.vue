<script setup lang="ts">
import { ref } from "vue";
import { trpc, isTRPCError } from "@/index";
import router from "@/router";
import ContentColumn from "@/components/ContentColumn.vue";
import Bapi from "@/components/Bapi.vue";

const me = await trpc.user.me.query();

if (!me.is_logged_in) {
    await router.replace("/login");
}

const username = me.is_logged_in ? me.data.username : "";

const projectName = ref("");
const projectSlug = ref("");
const projectDesc = ref("");
const summary = ref("");
const error = ref("");

async function upload() {
    error.value = "";

    try {
        await trpc.project.create.mutate({
            projectName: projectName.value,
            projectSlug: projectSlug.value,
            projectDesc: projectDesc.value,
            summary: summary.value,
        });

        await router.push(`/project/${username}/${projectSlug.value}`);
    } catch (err) {
        error.value = isTRPCError(err)
            ? err.message
            : "an unknown error occured";
    }
}
</script>

<template>
    <ContentColumn>
        <h1 class="center">lets make a new project!</h1>
        <div class="flex" style="gap: 10px">
            <input v-model="projectName" placeholder="project name" />
            <input v-model="projectSlug" placeholder="project slug" />
            <input v-model="projectDesc" placeholder="project description" />
            <input v-model="summary" placeholder="summary" />
        </div>
        <Bapi @click="upload">upload</Bapi>
        <p>{{ error }}</p>
    </ContentColumn>
</template>

<style scoped>
input {
    color: black;
}

.center {
    text-align: center;
}

.flex {
    display: flex;
}

.bigflex {
    flex: 1;
}
</style>
