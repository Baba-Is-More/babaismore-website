export type User = {
	name: string
	id: string
};

export type SearchResult = {
	name: string
	author: string
	desc: string
	downloads: number
	posted: Date
	tags: string[]
};

export const tags = [
	"Global Install",
	"Utility",
	"Toolbox",
	"Flare of Flair",
	"Gameplay",
	"Extendable",
	"Large Scale",
	"Feels Vanilla",
	
];