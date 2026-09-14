<script setup lang="ts">
import type * as user from "@common/users";

const props = defineProps<{
    data: user.projects.ResultItem;
}>();
</script>

<template>
    <a :href="`/project/${data.author}/${data.slug}`">
        <div class="base blue box">
            <!-- TODO: add the project thumbnail to here too -->
            <p>{{ data.name }}</p>
            <p class="faded">{{ data.slug }}</p>
        </div>
    </a>
</template>

<style scoped>
a {
    text-decoration: none;
}

.base {
    background-color: #00000000;
    align-items: center;
    height: 100%;
    border-image-slice: 8 8 8 8 fill;
    border-image-width: 8px 8px 8px 8px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: round round;
    border-style: solid;
    image-rendering: pixelated;
    color: white;
}

.box {
    box-sizing: border-box;
    display: flex;
    padding: 0px 10px;
    gap: 3px;
}

.blue {
    border-image-source: url("/images/buttons/button_blue.png");
}

.faded {
    color: gray;
}
</style>
