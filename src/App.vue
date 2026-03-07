<script setup lang="ts">
import Navbar from '@/components/Navbar/Bar.vue'
</script>

<template>
        <Navbar />

        <div class="main">
                <router-view />
        </div>
</template>

<style>
.main {
        /* if you change this, change components/navbar/Bar.vue as well */
        margin-top: 10vh;
}
</style>
