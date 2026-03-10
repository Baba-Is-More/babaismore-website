<script setup lang="ts">
import Babu from '@/components/Babu.vue'
</script>

<template>
	<div id="main">
		<img src="\images\image_more_text.gif" alt="More" id="logo">
	</div>
</template>

<style scoped>
h1,
p {
	color: white
}

#logo {
	image-rendering: crisp-edges;
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 5%;
	width: 15%;
}

#main {
	width: 80%;
	height: 1000px;
	background-color: #293141;
	margin-left: 10%;
}
</style>
