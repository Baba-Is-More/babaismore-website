<script setup lang="ts">
import Search from '@/components/Navbar/Search.vue'
import Profile from '@/components/Navbar/Profile.vue'
</script>

<template>
	<nav class="navbar">
		<img src="@/assets/image_logo.gif" class="logo">

		<Search class="search" />

		<Profile />
	</nav>
</template>

<style>
.navbar {
	background-color: #1C1E24;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	/* if you change this, change App.vue as well */
	height: 10vh;

	display: flex;
	align-items: center;
}

/* we can adjust these as we see fit */
.search {
	flex: 1;
	padding-left: 2%;
	padding-right: 4%;
}

.logo {
	height: 90%;
	width: auto;
}
</style>
