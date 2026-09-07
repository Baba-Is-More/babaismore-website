import SlugZod from "@common/slug";
import * as z from "zod";

export const Query = z.object({
    author: z.string(),
    slug: SlugZod,
});

export type Query = z.infer<typeof Query>;
