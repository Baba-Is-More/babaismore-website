<script setup lang="ts">
import type { User } from '@/lies/types.ts'
import usr from '@/lies/user.ts'

</script>

<template>
	<div style="display: flex; flex-direction: column;">
		<p class="name"> {{ usr.name }} </p>
		<p class="id"> {{ usr.id }} </p>
	</div>
	<img src="\images\image_baba.png" alt="Profile">
</template>

<style>
.name {
	color: white;
}
.id {
	color: #737373;
	font-size: 6px;
	padding-left: 4px;
}
p {
	align-self: left;
}
</style>
