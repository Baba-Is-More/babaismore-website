<script setup lang="ts">
import Panel from '@/components/Panel.vue';
import Bapi from '@/components/Bapi.vue';

</script>

<template>
    <div id="main">
        <img src="\images\image_more_text.gif" alt="More" id="logo" />
        <p class="text-center" id="blurb">This website is used for cataloguing Baba Is You mods, levelpacks, and level
            codes. Whether you're here as a long-time creator, or just a player, we have you covered!</p>
        <div id="grid">
            <Panel class="panel">
                <h2>Mods</h2>
                <!-- TODO: replace this with a more fitting image -->
                <img src="\images\image_levelpacks.png" alt="Levelpacks" class="image" />
                <p>Custom sprites, music, code, and more things made by the community.</p>
                <Bapi id="mods">
                    <p>Browse Mods</p>
                </Bapi>
                <div id="col3">
                    <Bapi class="col">
                        <p>Palettes</p>
                    </Bapi>
                    <Bapi class="col">
                        <p>Sprites</p>
                    </Bapi>
                    <Bapi class="col">
                        <p>Music</p>
                    </Bapi>
                </div>
            </Panel>
            <Panel class="panel" id="levels">
                <h2>Levels</h2>
                <img src="\images\image_levelpacks.png" alt="Levelpacks" class="image" />
                <p>Downloadable Levelpacks and individual Level Codes.</p>
                <Bapi id="levelpacks">
                    <p>Browse Levelpacks</p>
                </Bapi>
                <Bapi>
                    <p>Browse Level Codes</p>
                </Bapi>
            </Panel>
        </div>
        <p id="disclaimer">
            Baba Is More is a site independent from Baba Is You, Arvi "Hempuli" Teikari, or any other official party
            associated with the Baba Is You IP. This legal disclaimer is not legally binding in any way, mostly because
            we haven't finished it yet!
        </p>
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
    grid-template-columns: 50% 50%;
    gap: 1rem;
    margin: 2%;
    justify-content: center;
}

#col3 {
    grid-template-columns: 30% 30% 30%;
    gap: 1rem;
    margin: 1%;
    align-items: center;
    display: flex;
    justify-content: center;
}

#levelpacks {
    margin-bottom: 1%;
}

#disclaimer {
    color: #888;
    text-align: center;
}

.col {
    margin: auto;
}

.text-center {
    text-align: center;
}

.panel {
    font-family: "BabaFont", sans-serif;
    text-align: center;
}

.image {
    image-rendering: pixelated;
    display: block;
    margin: auto;
}
</style>
