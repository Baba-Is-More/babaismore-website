<script setup lang="ts" generic="T extends string | number">
import Babu from "../Babu.vue";
import Bapi from "../Bapi.vue";

const props = defineProps<{
    tabs: T[];
    tabLabels: Record<T, string>;
}>();

const activeTab = defineModel<T>({ required: true });
</script>

<template>
    <div class="list">
        <component
            v-for="tab in props.tabs"
            :key="tab"
            :is="activeTab === tab ? Bapi : Babu"
            class="big"
            @click="activeTab = tab"
        >
            {{ props.tabLabels[tab] }}
        </component>
    </div>
</template>

<style scoped>
.list {
    display: flex;
    gap: 10px;
}

@media (min-width: 600px) {
    .list {
        padding-left: 10px;
        padding-right: 10px;
    }
}

.big {
    flex: 1;
    min-width: 0;
    text-align: center;
}

.baba-button {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
}
</style>
