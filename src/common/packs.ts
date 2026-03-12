// this file comes up with some random stuff for search to show

import type { SearchResult } from "@common/SearchResult";

export default [
  {
    name: "WARNING: NO MONGODB CONNECTION MADE!",
    author: "me",
    desc: "not a mod",
    downloads: 140,
    posted: new Date(2024, 10, 3, 1, 30),
    tags: ["Nothing"],
  },
  {
    name: "Based Mod",
    author: "Plasmaflare",
    desc: "A simple mod for adding baserules to your levelpack.",
    downloads: 140,
    posted: new Date(2024, 10, 3, 1, 30),
    tags: ["Global Install", "Utility", "Toolbox"],
  },
  {
    name: "Menu Background Randomizer",
    author: "Extrem",
    desc: "Randomizes the background of the titlescreen.",
    downloads: 417,
    posted: new Date(2024, 2, 10, 2, 30),
    tags: ["Global Install", "Flare of Flair", "Nice Visuals"],
  },
  {
    name: "Proverb Mod",
    author: "Pigeon",
    desc: "Allows an easy way to create and manage custom verbs.",
    downloads: 0,
    posted: new Date("2025-04-17"),
    tags: ["Utility", "Gameplay", "Extendable"],
  },
  {
    name: "(untitled mod)",
    author: "DizzyAndy",
    desc: "A large selection of custom words, building off of the vanilla ones.",
    downloads: 1.46e7,
    posted: new Date("2011-10-10T14:48:00.000+09:00"),
    tags: ["Large Scale", "Variety Pack", "Feels Vanilla"],
  },
  {
    name: "Blank Mod",
    author: "Extrem",
    desc: "Allows an easy way to create and manage custom non-property words, useful when combined with hidden text. This specific description is also really, really, really long, for the sake of testing. Can you see all this? Okay, this next period is the last character in the text string - hope you see it.",
    downloads: Number.MAX_SAFE_INTEGER,
    posted: new Date(),
    tags: ["Utility", "Gameplay", "Extendable"],
  },
  {
    name: "Menu+",
    author: "Extrem",
    desc: "Upgrades the levelpack navigation menus by providing a lot of utilities, such as levelpack pinning and showing level counts.",
    downloads: 35050,
    posted: new Date(99, 1, 2, 3, 4),
    tags: ["Global Install", "Utility", "Flare of Flair"],
  },
] as SearchResult[];
