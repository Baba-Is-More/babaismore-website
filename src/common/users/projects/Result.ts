import SlugZod from "@common/slug";
import * as z from "zod";

const ResultItem = z.object({
    name: z.string(),
    slug: SlugZod,
    summary: z.string(),
    downloads: z.number(),
    posted: z.coerce.date(),
    tags: z.array(z.string()),
});

export type ResultItem = z.infer<typeof ResultItem>;

export const Result = z.object({
    projects: z.array(ResultItem),
    hasMore: z.boolean(),
});

export type Result = z.infer<typeof Result>;
