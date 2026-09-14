<script setup lang="ts">
import { ref } from "vue";
import Bapi from "@/components/Bapi.vue";
import Babu from "@/components/Babu.vue";
import { trpc } from "@/index";
import type * as project from "@common/project";
import Bage from "../Bage.vue";

const props = defineProps<{
    author: string;
    slug: string;
    file: project.files.File;
    editable: boolean;
}>();

const expanded = ref(false);
const version = ref(props.file.version);
const fileDesc = ref(props.file.fileDesc);
const error = ref("");

function toggleExpanded() {
    expanded.value = !expanded.value;
}

function is_update_blocked(): boolean {
    const version_is_new = version.value != props.file.version;
    const fileDesc_is_new = fileDesc.value != props.file.fileDesc;

    return !(version_is_new || fileDesc_is_new);
}

async function updateFile() {
    if (is_update_blocked()) return;

    error.value = "";

    try {
        await trpc.project.files.update.mutate({
            author: props.author,
            slug: props.slug,
            fileName: props.file.fileName,
            version: version.value,
            fileDesc: fileDesc.value,
        });
    } catch (err) {
        error.value = (err as Error).message;
    }
}
</script>

<template>
<div class="row">
    <div class="flex">
        <a :href="`/download/${author}/${slug}/${file.fileName}`">
            <Bage>
                <p>Download</p>
            </Bage>
        </a>

        <Babu v-if="editable" @click="toggleExpanded">
            <p>Edit</p>
        </Babu>

        <p>{{ file.version }}</p>
        <p>{{ file.fileDesc }}</p>
    </div>

    <div v-if="expanded" class="edit-menu">
        <div class="flex">
            <p> Version name: </p>
            <input v-model="version" />
        </div>
        <div class="flex">
            <p> Version Description: </p>
            <input v-model="fileDesc" />
        </div>

        <Bapi @click="updateFile">
            <p>Update</p>
        </Bapi>

        <p>{{ error }}</p>
    </div>
</div>
</template>

<style scoped>
.row {
    margin: 10px 10px;
}

.flex {
    display: flex;
}

a {
    text-decoration: none;
}

input {
    color: black
}

.edit-menu .baba-button {
    padding: 2px 8px;
}

.edit-menu {
    padding-bottom: 20px;
}
</style>
