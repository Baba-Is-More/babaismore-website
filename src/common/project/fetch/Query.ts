import * as z from "zod";

export const Query = z.object({
    author: z.string(),
    project: z.string(),
});

export type Query = z.infer<typeof Query>;
