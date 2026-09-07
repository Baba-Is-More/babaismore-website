<script setup lang="ts">
import { RouterLink } from "vue-router";
import Babu from "../Babu.vue";
import Bapi from "../Bapi.vue";

defineProps<{
    username: string;
}>();
</script>

<template>
    <div class="quick-buttons">
        <RouterLink to="/settings" class="link">
            <Bapi>Settings</Bapi>
        </RouterLink>
        <div style="flex: 1" />
        <Babu>Upload</Babu>
    </div>
</template>

<style scoped>
.quick-buttons {
    display: flex;
}

.link {
    text-decoration: none;
}
</style>
