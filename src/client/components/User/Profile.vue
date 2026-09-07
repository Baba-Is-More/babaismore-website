<script setup lang="ts">
defineProps<{
    displayName: string;
    username: string;
    profilePicture: string;
}>();
</script>

<template>
    <div class="user">
        <img
            :src="profilePicture"
            :alt="displayName"
            class="inline"
        />
        <div>
            <p>display name:</p>
            <h1>{{ displayName }}</h1>
        </div>
        <div>
            <p>username:</p>
            <h1>{{ username }}</h1>
        </div>
        <p>pronouns: (later)</p>
    </div>
</template>

<style scoped>
.user {
    display: flex;
}

.user * {
    flex: 2;
}

.inline {
    flex: 1;
}
</style>
