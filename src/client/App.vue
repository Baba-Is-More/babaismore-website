<script setup lang="ts">
import Navbar from "@/components/Navbar/Bar.vue";
</script>

<template>
    <Navbar />

    <div class="main">
        <!-- should this be fully engulfed by suspense? -->
        <Suspense>
            <router-view />
        </Suspense>
    </div>
</template>

<style scoped>
.main {
    /* if you change this, change components/navbar/Bar.vue as well */
    margin-top: 56px;
}
</style>
