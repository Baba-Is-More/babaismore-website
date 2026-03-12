<script setup lang="ts">
import Panel from '@/components/Panel.vue';

</script>

<template>
    <div id="main">
        <img src="\images\image_more_text.gif" alt="More" id="logo" />
        <p class="text-center" id="blurb">This website is used for cataloguing Baba Is You mods, levelpacks, and level
            codes. Whether you're here as a long-time creator, or just a player, we have you covered!</p>
        <div id="grid">
            <Panel class="panel">
                <p>packs panel</p>
            </Panel>
            <Panel class="panel">
                <p>packs panel</p>
            </Panel>
        </div>
    </div>
</template>

<style scoped>
h1,
p {
    color: white;
}

#logo {
    image-rendering: pixelated;
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

#blurb {
    padding: 0% 15% 0% 15%;
}

#grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.text-center {
    text-align: center;
}

.panel {
    font-family: "BabaFont", sans-serif;
}
</style>
