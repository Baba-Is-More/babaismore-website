import * as z from "zod";
import SlugZod from "@common/slug";

export const Query = z.object({
    projectName: z.string().min(1),
    projectSlug: SlugZod,
    projectDesc: z.string().default(""),
    summary: z.string().default(""),
    tags: z.array(z.string()).default([]),
    galleryImages: z
        .array(
            z.object({
                imageName: z.string().min(1),
                imageAlt: z.string().optional(),
            }),
        )
        .default([]),
});

export type Query = z.infer<typeof Query>;
