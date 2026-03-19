import * as z from "zod";

export const FetchResult = z.object({
    author: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
    starCount: z.number().min(0).max(5),
});

export type FetchResult = z.infer<typeof FetchResult>;
