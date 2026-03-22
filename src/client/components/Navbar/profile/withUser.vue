<script setup lang="ts">
const props = defineProps<{
    username: string;
    displayName: string;
    profilePicture: string;
}>();
</script>

<template>
    <div style="display: contents">
        <div style="display: flex; flex-direction: column">
            <p class="name">{{ displayName }}</p>
            <p class="id">{{ username }}</p>
        </div>
        <img class="profile" :src="profilePicture" alt="Profile" />
    </div>
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
