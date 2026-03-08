<script setup lang="ts">
import type { SearchResult } from '@/liar.ts';

const props = defineProps<SearchResult>()

function truncate(desc: string): string {
	const max_length: number = 256
	if (desc.length >= 128) {
		return desc.substring(0, max_length - 3).concat("...");
	} else {
		return desc;
	}
}
</script>

<template>
	<div class="base">
		<p class="name"> {{ name }} </p>
		<p class="author"> <img src="\images\image_baba.png" alt="{{ author }}"> {{ author }} </p>
		<p class="desc"> {{ truncate(desc) }} </p>
	</div>
</template>

<style>
.base {
	background-color: #00000000;
	display: flexbox;
	align-items: center;
	height: 100%;
	border-image-slice: 8 8 8 8 fill;
	border-image-width: 10px 10px 10px 10px;
	border-image-outset: 0px 0px 0px 0px;
	border-image-repeat: round round;
	border-image-source: url("/images/buttons/button_blue.png");
	border-style: solid;
	image-rendering: crisp-edges;
	color: white;
	padding: 0px 0px 0px 5px;
}

.author {
	color: #83c8e5
}

img {
	width: 31px;
	height: 31px;
	vertical-align: bottom;
}

p {
	font-size: 12px;
}
</style>
