<script setup lang="ts">
import type { SearchResult } from '@/liar.ts';

const props = defineProps<SearchResult>()

function truncate(desc: string): string {
	const max_length: number = 256
	if (desc.length >= 128) {
		return desc.substring(0, max_length - 3).concat("...");
	} else {
		return desc;
	}
}

function reduce(num: number): string {
	let display: string = num.toString();
	let end: string = "";
	if (num >= 1_000_000_000_000_000) {
		display = (num / 1_000_000_000_000_000).toString();
		end = "QD";
	} else if (num >= 1_000_000_000_000) {
		display = (num / 1_000_000_000_000).toString();
		end = "T";
	} else if (num >= 1_000_000_000) {
		display = (num / 1_000_000_000).toString();
		end = "B";
	} else if (num >= 1_000_000) {
		display = (num / 1_000_000).toString();
		end = "M";
	} else if (num >= 1_000) {
		display = (num / 1_000).toString();
		end = "K";
	}
	if (display.includes('.')) {
		let decimal: number = display.indexOf('.');
		display = display.substring(0, decimal + 2);
	}
	display = display.concat(end).replace(".0".concat(end), end);
	return display;
}
</script>

<template>
	<div class="base">
		<div>
			<img src="\images\image_levelpacks.png" alt="{{ name }}" id="icon">
			<p class="name"> {{ name }} </p>
			<p class="author"> <img src="\images\image_baba.png" alt="{{ author }}" class="inline"> {{ author }} </p>
			<p class="info"> <img src="\images\image_downloads.png" alt="{{ downloads }} downloads" class="inline"> {{
				reduce(downloads) }}</p>
		</div>
		<p class="desc"> {{ truncate(desc) }} </p>
	</div>
</template>

<style>
.base {
	background-color: #00000000;
	display: flexbox;
	align-items: center;
	height: 100%;
	border-image-slice: 8 8 8 8 fill;
	border-image-width: 10px 10px 10px 10px;
	border-image-outset: 0px 0px 0px 0px;
	border-image-repeat: round round;
	border-image-source: url("/images/buttons/button_blue.png");
	border-style: solid;
	image-rendering: crisp-edges;
	color: white;
	padding: 0px 0px 0px 10px;
}

.base>div {
	height: fit-content;
}

.author {
	color: #83c8e5
}

.inline {
	width: 31px;
	height: 31px;
	vertical-align: top;
}

.desc {
	display: inline-block;
}

.info {
	color: #5f9dd1;
}

p {
	font-size: 12px;
	margin: 0px;
}

.name {
	margin: 4px;
}

#icon {
	width: 128px;
	height: 128px;
	vertical-align: top;
	float: left;
	margin: 1px;
}
</style>
