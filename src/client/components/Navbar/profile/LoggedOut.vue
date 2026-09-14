<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <div>
        <RouterLink to="/login">
            <p>logged out</p>
        </RouterLink>
    </div>
</template>

<style scoped>
p {
    color: white;
    cursor: pointer;
}

a {
    text-decoration: none;
}
</style>
