<script setup lang="ts">
import SearchPack from '@/components/SearchPack.vue'
import lies from '@/liar.ts'
import { ref } from 'vue'
import { watch } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()

const query = route.query.q

watch(
	() => route.query.q,
	(newQuery) => {
		// i do not know how vue router works
		// so im just gonna reload the page
		// bad bad idea i know
		window.location.reload()
	},
)

// i'll hook the grid making into this laterrr
const stuff = ref<SearchResult>(lies);
</script>

<template>
	<h1>Search results for {{ query }}</h1>
	<div class="grid">
		<!-- horrific! -->
		<SearchPack name="cool thing" author="me" desc="blahblahblahblah" />
		<SearchPack name="cool thing" author="me" desc="blahblahblahblah" />
		<SearchPack name="cool thing" author="me" desc="blahblahblahblah" />

		<SearchPack name="cool thing" author="me" desc="blahblahblahblah" />
		<SearchPack name="cool thing" author="me" desc="blahblahblahblah" />
		<SearchPack name="cool thing" author="me" desc="blahblahblahblah" />
	</div>
</template>

<style scoped>
h1,
p {
	color: white
}

.grid {
	display: grid;
	grid-template-columns: auto auto auto;
}
</style>
