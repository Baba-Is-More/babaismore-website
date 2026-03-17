import * as z from "zod";

export const FetchQuery = z.object({
    author: z.string(),
    project: z.string(),
});

export type FetchQuery = z.infer<typeof FetchQuery>;
