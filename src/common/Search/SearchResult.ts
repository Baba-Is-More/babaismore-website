import * as z from "zod";

export const SearchResult = z.object({
    name: z.string(),
    author: z.string(),
    desc: z.string(),
    downloads: z.number(),
    posted: z.coerce.date(),
    tags: z.array(z.string()),
});

export type SearchResult = z.infer<typeof SearchResult>;
