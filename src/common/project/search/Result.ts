import SlugZod from "@common/slug";
import * as z from "zod";

export const Result = z.object({
    name: z.string(),
    slug: SlugZod,
    author: z.string(),
    summary: z.string(),
    downloads: z.number(),
    posted: z.coerce.date(),
    tags: z.array(z.string()),
});

export type Result = z.infer<typeof Result>;
