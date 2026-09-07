import SlugZod from "@common/slug";
import * as z from "zod";

export const Result = z.object({
    author: z.string(),
    title: z.string(),
    slug: SlugZod,
    description: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
});

export type Result = z.infer<typeof Result>;
