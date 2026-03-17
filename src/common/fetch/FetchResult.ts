import * as z from "zod";

export const FetchResult = z.object({
    author: z.string(),
    description: z.string(),
    thumbnail: z.string(),
});

export type FetchResult = z.infer<typeof FetchResult>;
