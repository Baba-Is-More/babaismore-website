<script setup lang="ts"></script>

<template>
    <div class="panel">
        <slot />
    </div>
</template>

<style scoped>
.panel {
    border-image-slice: 8 8 8 8 fill;
    border-image-width: 8px 8px 8px 8px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: round round;
    border-style: solid;
    image-rendering: pixelated;
    font-family: "BabaFont", sans-serif;
    color: white;
    padding: 4.5px;
    padding-left: 40px;
    padding-right: 40px;
    border-image-source: url("/images/buttons/button_blue.png");
}
</style>
