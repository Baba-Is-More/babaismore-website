<script setup lang="ts">
import { ref } from "vue";
import Babu from "@/components/Babu.vue";
import { tags } from "@/lies/tags";

const isFilterOpen = ref(false);
const isSortOpen = ref(false);
</script>

<template>
    <div id="grid">
        <Babu
            id="tags"
            class="main"
            @click="
                isFilterOpen = !isFilterOpen;
                isSortOpen = false;
            "
            title="Tags"
        >
            <img src="\images\image_tag.png" alt="Tag" class="image" />
        </Babu>
        <Babu
            id="sorts"
            class="main"
            @click="
                isSortOpen = !isSortOpen;
                isFilterOpen = false;
            "
            title="Sorts"
        >
            <img src="\images\image_sort.png" alt="Sort" class="image" />
        </Babu>
    </div>
    <div v-if="isFilterOpen" class="menu">
        <label class="text-label" v-for="tag in tags" :key="tag">
            <input type="checkbox" class="checkbox" />
            <span class="check"></span><span>{{ tag }}</span>
        </label>
    </div>
    <div v-if="isSortOpen" class="menu">foo bar</div>
</template>

<style scoped>
.main {
    font-family: "BabaFont", sans-serif;
    width: fit-content;
    margin-right: 4px;
}

#grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 1%;
    width: max-content;
}

.image {
    height: 48px;
    vertical-align: middle;
    width: min-content;
}

.menu {
    color: white;
    background-color: #00000000;
    align-items: center;
    height: 100%;
    border-image-slice: 8 8 8 8 fill;
    border-image-width: 8px 8px 8px 8px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: round round;
    border-style: solid;
    image-rendering: pixelated;
    border-image-source: url("/images/buttons/button_purple.png");
    font-size: 12px;
    position: relative;
    width: fit-content;
    padding: 10px;
}

.checkbox {
    float: right;
    vertical-align: middle;
    width: 15px;
    height: 100%;
}

.text-label {
    position: relative;
    font-size: 8px;
    padding: 4px 4px;
    padding-left: 30px;
    width: 180px;
    border-image-slice: 8 8 8 8 fill;
    border-image-width: 8px 8px 8px 8px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: round round;
    border-style: solid;
    image-rendering: pixelated;
    border-image-source: url("/images/buttons/button_purple.png");
}

.text-label:hover {
    border-image-source: url("/images/buttons/button_purple_hover.png");
}

.text-label:active {
    border-image-source: url("/images/buttons/button_purple_press.png");
}

input {
    display: none;
}

input:checked + .check {
    background-image: url("/images/image_checkmark.png");
}

.text-label:has(input:checked) {
    border-image-source: url("/images/buttons/button_pink.png");
}

.text-label:hover:has(input:checked) {
    border-image-source: url("/images/buttons/button_pink_hover.png");
}

.text-label:active:has(input:checked) {
    border-image-source: url("/images/buttons/button_pink_press.png");
}

.check {
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    left: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
