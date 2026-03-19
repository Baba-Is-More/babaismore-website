import * as z from "zod";

export const StarRateQuery = z.object({
    user: z.string(),
    author: z.string(),
    project: z.string(),
    count: z.number().min(0).max(5),
});

export type StarRateQuery = z.infer<typeof StarRateQuery>;
