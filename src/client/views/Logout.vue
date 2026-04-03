<script setup lang="ts">
import router from "@/router";
import { trpc } from "..";

await trpc.auth.logout.mutate();

await router.replace("/");
window.location.reload();
</script>

<template>
    <div class="logout">
        <div>
            <p>logging out of baba is more!</p>
        </div>
    </div>
</template>

<style>
* {
    color: white;
}

img {
    height: auto;
    width: 80%;
}

.logout {
    background-color: #293141;
    margin: 100px;
    border-radius: 5px;
    display: flex;
}

.logout div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
