import * as z from "zod";

export enum SortType {
    MostDownloaded,
    LeastDownloaded,
    Newest,
    Oldest,
}

export const TagQuery = z.object({
    is_negated: z.boolean().default(false),
    tag: z.string().lowercase(),
});

export type TagQuery = z.infer<typeof TagQuery>;

export const SearchQuery = z.object({
    keywords: z.array(z.string()),
    tags: z.array(TagQuery),
    sort: z.enum(SortType),
});

export type SearchQuery = z.infer<typeof SearchQuery>;
