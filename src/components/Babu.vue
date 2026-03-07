<script setup lang="ts">
</script>

<template>
	<div class="babu">Button</div>
</template>

<style scoped>
/* Implementation done by @xnorvey on Discord*/
.babu {
	border-image-slice: 8 8 8 8 fill;
	border-image-width: 10px 10px 10px 10px;
	border-image-outset: 0px 0px 0px 0px;
	border-image-repeat: round round;
	border-image-source: url("/public/images/buttons/button_blue.png");
	border-style: solid;
	image-rendering: crisp-edges;
	font-family: "Baba UI", sans-serif;
	color: white;
	padding: 4.5px;
	padding-left: 40px;
	padding-right: 40px;
	cursor: pointer;
}

.babu:hover {
	border-image-source: url("/public/images/buttons/button_blue_hover.png");
}

.babu:active {
	border-image-source: url("/public/images/buttons/button_blue_press.png");
}

.babu:disabled {
	border-image-source: url("/public/images/buttons/button_disabled.png");
}
</style>
