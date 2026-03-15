import * as z from "zod";

export enum SortType {
    None,
    MostDownloaded,
    LeastDownloaded,
    Newest,
    Oldest,
}

export const SearchQuery = z.object({
    keywords: z.string(),
    tags: z.array(z.string()),
    sort: z.enum(SortType).default(SortType.None),
});

export type SearchQuery = z.infer<typeof SearchQuery>;
