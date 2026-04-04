<script setup lang="ts">
import type { LoginQuery } from "@common/login/loginQuery";
import { ref } from "vue";
import { trpc } from "..";
import type { SignupQuery } from "@common/signup/SignupQuery";
import router from "@/router";

const username = ref("");
const email = ref("");
const password = ref("");
const displayName = ref("");

async function start_signup() {
    const query: SignupQuery = {
        username: username.value,
        email: email.value,
        password: password.value,
        displayName: displayName.value,
    };

    try {
        // try to signup
        await trpc.auth.signup.mutate(query);
    } catch (err) {
        // if something went wrong
        // we should handle it...
    } finally {
        // if we signed up successfully, we can go to login
        await router.replace("/login");
        window.location.reload();
    }
}
</script>

<template>
    <div class="board">
        <div class="signup">
            <input
                name="username"
                type="username"
                placeholder="username"
                required
                v-model="username"
            />
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
            <input
                name="displayName"
                placeholder="display name"
                required
                v-model="displayName"
            />
            <div style="flex: 1"></div>
            <button @click="start_signup">Sign up!</button>
        </div>
        <div class="separator"></div>
        <div class="info">
            <h3>sign up to baba is more!</h3>
            <img src="/images/image_baba.png" />
            <a href="/login"> <p>meant to login?</p></a>
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

.signup {
    flex: 1;

    align-items: center;
    display: flex;
    flex-direction: column;
}

.signup * {
    background-color: #293141;
}
</style>
