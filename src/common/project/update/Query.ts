import * as z from "zod";
import SlugZod from "@common/slug";

export const Query = z.object({
    // identifies the project being updated
    author: z.string(),
    slug: SlugZod,

    // only the changed fields are sent; anything left out stays as-is
    projectName: z.string().min(1).optional(),
    projectSlug: SlugZod.optional(),
    projectDesc: z.string().optional(),
    summary: z.string().optional(),
});

export type Query = z.infer<typeof Query>;
