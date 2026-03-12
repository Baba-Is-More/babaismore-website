<script setup lang="ts">
import SearchPack from "@/components/SearchPack.vue";
import Filter from "@/components/Filter.vue";
import lies from "@common/packs";
import type { SearchResult } from "@common/SearchResult";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { trpc } from "..";

const route = useRoute();

const query = route.query.q;

watch(
  () => route.query.q,
  (newQuery) => {
    // i do not know how vue router works
    // so im just gonna reload the page
    // bad bad idea i know
    globalThis.location.reload();
  },
);

const results = ref<SearchResult[]>(
  (await trpc.project.getProjects.query()).map((v) => {
    return {
      author: v.author,
      desc: v.desc,
      downloads: v.downloads,
      name: v.name,
      posted: new Date(v.posted),
      tags: v.tags,
    };
  }),
);
</script>

<template>
  <h3 class="head">Search Filters</h3>
  <Filter />
  <div class="grid">
    <div
      v-for="({ name, author, desc, downloads, posted, tags }, idx) in results"
    >
      <SearchPack :name :author :desc :downloads :posted :tags />
    </div>
  </div>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: white;
  font-weight: normal;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.head {
  position: relative;
  top: 6px;
}
</style>
