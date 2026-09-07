<!--
most important information is placed here at the center so children
can be free to put whatever without the bg interfering
-->
<script setup lang="ts"></script>

<template>
    <div class="content-column">
        <slot />
    </div>
</template>

<style scoped>
.content-column {
    box-sizing: border-box;
    width: 100%;
    max-width: 900px;
    margin-inline: auto;
    background-color: #293141;
    color: white;
}
</style>
