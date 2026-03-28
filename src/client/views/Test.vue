<script setup lang="ts"></script>

<template>
    <form method="POST" action="/auth/login">
        <input name="email" type="email" placeholder="email" required />
        <input
            name="password"
            type="password"
            placeholder="password"
            required
        />
        <button type="submit">Login</button>
    </form>
</template>

<style scoped>
h1,
p {
    color: white;
}
</style>
