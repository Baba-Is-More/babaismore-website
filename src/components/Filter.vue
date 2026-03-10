<script setup lang="ts">
import { ref } from 'vue';
import Babu from './Babu.vue';
import { tags } from '@/lies/types';

const isFilterOpen = ref(false);
const isSortOpen = ref(false);

</script>

<template>
    <div id="grid">
        <Babu id="tags" class="main" @click="isFilterOpen = !isFilterOpen; isSortOpen = false;" title="Tags">
            <img src="\images\image_tag.png" alt="Tag" id="tag" class="image">
        </Babu>
        <Babu id="sorts" class="main" @click="isSortOpen = !isSortOpen; isFilterOpen = false;" title="Sorts">
            <img src="\images\image_sort.png" alt="Sort" id="sort" class="image">
        </Babu>
    </div>
    <div v-if="isFilterOpen" id="filterMenu">
        <div v-for="tag in tags">
            {{ tag }}
            <input type="checkbox" class="checkbox">
        </div>
    </div>
    <div v-if="isSortOpen" id="sortMenu">
        foo bar
    </div>
</template>

<style>
#tags, #sorts {
    width: min-content;
    font-family: "Baba UI", sans-serif;
    margin-bottom: 1%;
    margin-right: 1%;
}

#grid {
    display: grid;
    grid-template-columns: min-content min-content;
    margin-bottom: 1%;
}

.image {
    height: 24px;
    vertical-align: middle;
}

#filterMenu, #sortMenu {
    z-index: 1;
	color: white;
    background-color: #00000000;
	align-items: center;
	height: 100%;
	border-image-slice: 8 8 8 8 fill;
	border-image-width: 10px 10px 10px 10px;
	border-image-outset: 0px 0px 0px 0px;
	border-image-repeat: round round;
	border-style: solid;
	image-rendering: pixelated;
    border-image-source: url("/images/buttons/button_purple.png");
    font-size: 12px;
    padding-left: 1%;
    margin-bottom: 1%;
    margin-top: 1%;
    position: relative;
    width: fit-content;
}

.checkbox {
    float: right;
    vertical-align: middle;
    width: 15px;
    height: 100%;
}
</style>