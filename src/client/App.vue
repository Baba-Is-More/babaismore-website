<script setup lang="ts">
import Navbar from "@/components/Navbar/Bar.vue";
import Footer from "@/components/Footer/Footer.vue";
</script>

<template>
    <Navbar />

    <div class="main">
        <!-- should this be fully engulfed by suspense? -->
        <Suspense>
            <router-view />
        </Suspense>

        <Footer />
    </div>
</template>

<style scoped>
.main {
    /* if you change this, change components/navbar/Bar.vue as well */
    margin-top: 56px;

    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main :first-child {
    flex: 1;
}
</style>
