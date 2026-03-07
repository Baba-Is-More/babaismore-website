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
		<input v-model="search" type="text" placeholder="Bababa ba...">
	</form>
</template>

<style>
.search {
	height: 80%;
	display: flex;
}

.search input {
	border: 0;
	color: white;
	background-color: #111111;
	border-radius: 5px;
	flex: 1;
}

.search input:focus {
	outline: 2px solid #555555;
	outline-offset: 2px;
}
</style>
