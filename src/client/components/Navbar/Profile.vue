<script setup lang="ts">
import { trpc } from "@/index";

const usr = (await trpc.user.getUsers.query())[0]!;

const avatar = "/uploads/avatars/" + usr.avatar + ".png";
</script>

<template>
    <div style="display: flex; flex-direction: column">
        <p class="name">{{ usr.name }}</p>
        <p class="id">{{ usr.id }}</p>
    </div>
    <img class="profile" :src="avatar" alt="Profile" />
</template>

<style scoped>
.name {
    color: white;
    font-size: 8px;
    margin: 0px;
    text-align: right;
}

.id {
    color: #737373;
    font-size: 8px;
    padding-left: 4px;
    margin: 0px;
    text-align: right;
}

p {
    align-self: left;
}

.profile {
    width: 48px;
    margin-left: 10px;
}
</style>
