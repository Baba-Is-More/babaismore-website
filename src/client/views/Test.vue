<script setup lang="ts">
import { ref, unref } from "vue";
import { trpc } from "..";
const user = ref("");
const pass = ref("");

function go() {
    trpc.auth.login.mutate({
        username: user.value,
        plainPassword: pass.value,
    });
}
</script>

<template>
    <input v-model="user" placeholder="username" />
    <input v-model="pass" placeholder="password" />
    <button @click="go">go!</button>
</template>

<style scoped>
h1,
p {
    color: white;
}
</style>
