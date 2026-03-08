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
		<h2> {{ name }} </h2>
		<h3> <img src="\images\image_baba.png" alt="{{ author }}"> {{ author }} </h3>
		<p> {{ truncate(desc) }} </p>
	</div>
</template>

<style>
.base {
	background-color: #d8d8d8;
	display: flexbox;
	align-items: center;
	margin: 5px;
	height: 100%;
	padding: 0px 2px
}

h3 {
	font-size: 10px;
}

img {
	width: 25px;
	height: 25px;
	vertical-align: bottom;
}

p {
	font-size: x-small;
}
</style>
