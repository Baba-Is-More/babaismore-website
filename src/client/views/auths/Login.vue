<script setup lang="ts">
import type { LoginQuery } from "@common/login/loginQuery";
import { ref } from "vue";
import { trpc, isTRPCError } from "@/index";

const email = ref("");
const password = ref("");
const error = ref("");
const unauthorized = ref(false);

async function start_login() {
    const query: LoginQuery = {
        username: email.value,
        plainPassword: password.value,
    };

    error.value = "";
    unauthorized.value = false;

    try {
        await trpc.auth.login.mutate(query);
    } catch (err) {
        if (isTRPCError(err) && err.data?.code === "UNAUTHORIZED") {
            unauthorized.value = true;
        } else {
            error.value = isTRPCError(err)
                ? err.message
                : "an unknown error occured";
        }
    }
}
</script>

<template>
    <div class="board">
        <div class="info">
            <h3>login to baba is more!</h3>
            <img src="/images/image_baba.png" />
            <a href="/signup"> <p>meant to sign up?</p></a>
        </div>
        <div class="separator"></div>
        <div class="login">
            <p v-if="unauthorized">incorrect email or password!</p>
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
            <p v-if="error">{{ error }}</p>
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

.board {
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
