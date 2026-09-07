<script setup lang="ts">
import { trpc } from "..";
import router from "@/router";
import ContentColumn from "@/components/ContentColumn.vue";

const me = await trpc.user.me.query();

if (!me.is_logged_in) {
    await router.replace("/login");
}
</script>

<template>
    <ContentColumn>
        <div v-if="me.is_logged_in">
            <h1>edit profile!</h1>
            <p>display name: {{ me.data.displayName }}</p>
            <p>username: {{ me.data.username }}</p>
        </div>
    </ContentColumn>
</template>
