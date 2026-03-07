// this file comes up with some random stuff for search to show

export type SearchResult = {
	name: string
	author: string
	desc: string
};

export default [
	{
		name: "Based Mod",
		author: "Plasmaflare",
		desc: "A simple mod for adding baserules to your levelpack."
	},
	{
		name: "Menu Background Randomizer",
		author: "Extrem",
		desc: "Randomizes the background of the titlescreen.",
	},
	{
		name: "Proverb Mod",
		author: "Pigeon",
		desc: "Allows an easy way to create and manage custom verbs."
	},
	{
		name: "(untitled mod)",
		author: "DizzyAndy",
		desc: "A large selection of custom words, building off of the vanilla ones."
	},
	{
		name: "Blank Mod",
		author: "Extrem",
		desc: "Allows an easy way to create and manage custom non-property words, useful when combined with hidden text. This specific description is also really, really, really long, for the sake of testing. Can you see all this? Okay, this next period is the last character in the text string - hope you see it.",
	},
	{
		name:"Menu+",
		author: "Extrem",
		desc: "Upgrades the levelpack navigation menus by providing a lot of utilities, such as levelpack pinning and showing level counts."
	},
] as SearchResult[];
