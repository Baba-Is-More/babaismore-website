<script setup lang="ts">
import type { LoginQuery } from "@common/login/loginQuery";
import { ref } from "vue";
import { trpc } from "..";

const email = ref("");
const password = ref("");

async function start_login() {
    const query: LoginQuery = {
        username: email.value,
        plainPassword: password.value,
    };

    await trpc.auth.login.mutate(query);
}
</script>

<template>
    <div class="log-sign-in">
        <div class="info">
            <h3>login to baba is more!</h3>
            <img src="/images/image_baba.png" />
            <a href="/signup"> <p>meant to sign up?</p></a>
        </div>
        <div class="separator"></div>
        <div class="login">
            <input
                name="email"
                type="email"
                placeholder="email"
                required
                v-model="email"
            />
            <input
                name="password"
                type="password"
                placeholder="password"
                required
                v-model="password"
            />
            <div style="flex: 1"></div>
            <button @click="start_login">Login</button>
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

.log-sign-in {
    background-color: #293141;
    display: flex;
    margin: 100px;
    border-radius: 5px;
}

.separator {
    border-left: 3px solid black;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
}

.info {
    flex: 1;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.login {
    flex: 1;

    align-items: center;
    display: flex;
    flex-direction: column;
}

.login * {
    background-color: #293141;
}
</style>
