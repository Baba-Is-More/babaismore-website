<script setup lang="ts">
import { SearchResult } from '@/liar.ts'

const props = defineProps<SearchResult>()
</script>

<template>
	<div class="base">
		<!--todo: unroughten this-->
		<h2> {{ name }} </h2>
		<h3> {{ author }} </h3>
		<p> {{ desc }} </p>
	</div>
</template>

<style>
.base {
	background-color: #d8d8d8;
	display: flexbox;
	align-items: center;
	margin: 5px;
}
</style>
