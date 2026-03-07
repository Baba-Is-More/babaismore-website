<script setup>
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
	width: 100%;
	height: 10%;

	display: flex;
	align-items: center;
}

.search {
	flex: 1;
	padding-left: 20px;
	padding-right: 60px;
}

.logo {
	height: 90%;
	width: auto;
}
</style>
