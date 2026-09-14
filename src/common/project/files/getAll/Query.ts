import SlugZod from "@common/slug";
import * as z from "zod";

export const Query = z.object({
    author: z.string(),
    slug: SlugZod,
    page: z.number().int().min(0).default(0),
});

export type Query = z.infer<typeof Query>;
