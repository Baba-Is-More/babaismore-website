<script setup lang="ts">
import SearchPack from '@/components/SearchPack.vue'
import lies, { type SearchResult } from '@/liar.ts'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const query = route.query.q

watch(
        () => route.query.q,
        (newQuery) => {
                // i do not know how vue router works
                // so im just gonna reload the page
                // bad bad idea i know
                globalThis.location.reload()
        },
)

const results = ref<SearchResult[]>(lies);
</script>

<template>
        <h1>Search results for {{ query }}</h1>
        <div class="grid">
                <div v-for="({ name, author, desc }, idx) in results">
                        <!--TODO: we should replace this with a dynamic check based on the card's length-->
                        <!--We also need to fix card heights so they're all consistent (ideally matching the tallest one of having a set height)-->
                        <SearchPack :name :author :desc />
                </div>
        </div>
</template>

<style scoped>
h1,
p {
        color: white
}

.grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
}
</style>
