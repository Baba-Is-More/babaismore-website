<script setup lang="ts">
import Navbar from '@/components/Navbar/Bar.vue'
import Babu from '@/components/Babu.vue'
</script>

<template>
        <Navbar />

        <h1>Placeholder title</h1>
        <p> Placeholder paragraph
        </p>

        <Babu />

        <div class="main">
                <router-view />
        </div>
</template>

<style scoped>
.main {
        /* if you change this, change components/navbar/Bar.vue as well */
        margin-top: 10vh;
}
</style>
