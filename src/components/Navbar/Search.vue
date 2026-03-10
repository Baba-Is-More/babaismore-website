<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const search = ref<string>('')

function submit() {
	console.log("searched: ", search.value)
	router.push({
		path: "/search",
		query: {
			q: search.value
		}
	})
}
</script>

<template>
	<form @submit.prevent="submit" class="search">
		<img src="\images\image_search.png" alt="Search">
		<input v-model="search" type="text" placeholder="Search...">
	</form>
</template>

<style>
.search {
	height: 34px;
	display: flex;
}

.search img {
	background-color: #111111;
	border-radius: 5px;
	border-bottom-right-radius: 0px;
	border-top-right-radius: 0px;
	image-rendering: pixelated;
	width: 24px;
	height: 24px;
	padding: 5px
}

.search input {
	border: 0;
	color: white;
	background-color: #111111;
	border-radius: 5px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	flex: 1;
	font-family: "Babafont", sans-serif;
	font-size: 8px;
}

.search input:focus {
	outline: 2px solid #555555;
	outline-offset: 2px;
}
</style>
