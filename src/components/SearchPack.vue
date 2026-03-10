<script setup lang="ts">
import type { SearchResult } from '@/lies/types.ts';

const props = defineProps<SearchResult>()

function truncate(desc: string): string {
	const max_length: number = 128
	if (desc.length >= max_length) {
		return desc.substring(0, max_length - 3).concat("...");
	} else {
		return desc;
	}
}

const numFormat = Intl.NumberFormat('en-US', {
	notation: "compact",
});

function reduce(num: number): string {
	return numFormat.format(num);
}

// Edited from fearofawhatplanet's code,
// sourced from https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
function dateToOffset(date: Date): string {
	const msPerMinute = 60 * 1000;
	const msPerHour = msPerMinute * 60;
	const msPerDay = msPerHour * 24;
	const msPerMonth = msPerDay * 30;
	const msPerYear = msPerDay * 365;

	let now: Date = new Date();
	let elapsed: number = now.valueOf() - date.valueOf();
	const rtf = new Intl.RelativeTimeFormat();

	if (elapsed < msPerMinute) {
		return rtf.format(-Math.floor(elapsed / 1000), "seconds");
	} else if (elapsed < msPerHour) {
		return rtf.format(-Math.floor(elapsed / msPerMinute), "minutes");
	} else if (elapsed < msPerDay) {
		return rtf.format(-Math.floor(elapsed / msPerHour), "hours");
	} else if (elapsed < msPerMonth) {
		return rtf.format(-Math.floor(elapsed / msPerDay), "days");
	} else if (elapsed < msPerYear) {
		return rtf.format(-Math.floor(elapsed / msPerMonth), "months");
	} else {
		return rtf.format(-Math.floor(elapsed / msPerYear), "years");
	}

}
</script>

<template>
	<div class="base blue" id="box">
		<div>
			<img src="\images\image_levelpacks.png" alt="{{ name }}" id="icon">
			<p class="name"> {{ name }} </p>
			<p class="author"> <img src="\images\image_baba.png" alt="{{ author }}" class="inline"> {{
				author }} </p>
			<p class="info"> <img src="\images\image_downloads.png" alt="{{ downloads }} downloads" class="inline"> {{
				reduce(downloads) }} <img src="\images\image_clock.png" alt="" class="inline"> {{
					dateToOffset(posted)
				}}</p>
		</div>
		<p class="desc"> {{ truncate(desc) }} </p>
		<div>
			<p v-for="tag in tags" id="tag" class="base pink">
				{{ tag }}
			</p>
		</div>
	</div>
</template>

<style>
.base {
	background-color: #00000000;
	align-items: center;
	height: 100%;
	border-image-slice: 8 8 8 8 fill;
	border-image-width: 10px 10px 10px 10px;
	border-image-outset: 0px 0px 0px 0px;
	border-image-repeat: round round;
	border-style: solid;
	image-rendering: pixelated;
	color: white;
}

#box {
	display: flexbox;
	padding: 0px 10px;
}

.blue {
	border-image-source: url("/images/buttons/button_blue.png");
}

.pink {
	border-image-source: url("/images/buttons/button_pink.png");
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

#tag {
	width: max-content;
	margin-right: 5px;
	margin-bottom: 5px;
	float: inline-start;
	padding: 2px 7px 2px 7px;
	font-size: 6px;
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
