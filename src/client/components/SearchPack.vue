<script setup lang="ts">
// i would love to bring SearchResult here but
// vue SFC doesnt resolve z.infer, so it cant see it!
// blehhh annoying but its okay
const props = defineProps<{
    name: string;
    slug: string;
    author: string;
    summary: string;
    downloads: number;
    posted: Date;
    tags: string[];
}>();

function truncate(desc: string): string {
    const max_length: number = 128;
    if (desc.length >= max_length) {
        return desc.substring(0, max_length - 3).concat("...");
    } else {
        return desc;
    }
}

const numFormat = Intl.NumberFormat("en-US", {
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
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

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
    <a :href="`/project/${author}/${slug}`">
        <div class="base blue" id="box">
            <div class="meta">
                <img src="\images\image_levelpacks.png" :alt="name" id="icon" />
                <p class="name">{{ name }}</p>
                <p class="author">
                    <img
                        src="\images\image_baba.png"
                        alt="{{ author }}"
                        class="inline"
                    />
                    {{ author }}
                </p>
                <p class="info">
                    <img
                        src="\images\image_downloads.png"
                        alt="{{ downloads }} downloads"
                        class="inline"
                    />
                    {{ reduce(downloads) }}
                </p>
                <p class="info">
                    <img src="\images\image_clock.png" alt="" class="inline" />
                    {{ dateToOffset(posted) }}
                </p>
            </div>
            <p class="desc">{{ truncate(summary) }}</p>
            <div>
                <p v-for="tag in tags" id="tag" class="base pink">
                    {{ tag }}
                </p>
            </div>
        </div>
    </a>
</template>

<style scoped>
a {
    color: inherit;
    text-decoration: inherit;
}

.base {
    background-color: #00000000;
    align-items: center;
    height: 100%;
    border-image-slice: 8 8 8 8 fill;
    border-image-width: 8px 8px 8px 8px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: round round;
    border-style: solid;
    image-rendering: pixelated;
    color: white;
}

#box {
    box-sizing: border-box;
    padding: 4px 10px 74px 10px;
}

.blue {
    border-image-source: url("/images/buttons/button_blue.png");
}

.pink {
    border-image-source: url("/images/buttons/button_pink.png");
}

.base > div {
    height: fit-content;
}

.author {
    color: #83c8e5;
}

.meta {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 4px 0;
}

.meta > p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    overflow-wrap: anywhere;
}

.inline {
    flex: none;
    width: 2em;
    height: 2em;
    vertical-align: middle;
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
    font-size: 8px;
}

p {
    margin: 0px;
}

.name {
    text-align: left;
    word-break: break-word;
}

#icon {
    vertical-align: top;
    margin: 1px;
    width: 100px;
    height: 100px;
}

.horizontal-align {
    display: flex;
}
</style>
