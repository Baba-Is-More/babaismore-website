<script setup lang="ts"></script>

<template>
    <div class="baba-button blue">
        <slot />
    </div>
</template>

<style scoped>
/* Implementation done by @xnorvey on Discord*/
.baba-button {
    border-image-slice: 8 8 8 8 fill;
    border-image-width: 8px 8px 8px 8px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: round round;
    border-style: solid;
    image-rendering: pixelated;
    font-family: "Baba UI", sans-serif;
    color: white;
    padding: 4.5px;
    padding-left: 40px;
    padding-right: 40px;
    cursor: pointer;
}

.baba-button.blue {
    border-image-source: url("/images/buttons/button_blue.png");
}

.baba-button.blue:hover {
    border-image-source: url("/images/buttons/button_blue_hover.png");
}

.baba-button.blue:active {
    border-image-source: url("/images/buttons/button_blue_press.png");
}

.baba-button.blue:disabled {
    border-image-source: url("/images/buttons/button_disabled.png");
}
</style>
