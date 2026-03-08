<script setup lang="ts">
import type { SearchResult } from '@/liar.ts';

const props = defineProps<SearchResult>()

function truncate(desc: string): string {
	const max_length: number = 128
	if (desc.length >= 128) {
		return desc.substring(0, max_length - 3).concat("...");
	} else {
		return desc;
	}
}
</script>

<template>
	<div class="base">
		<!--todo: unroughten this-->
		<h2> {{ name }} </h2>
		<h3> {{ author }} </h3>
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
}

p {
	font-size: small;
}
</style>
