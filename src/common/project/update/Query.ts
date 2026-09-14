import * as z from "zod";
import SlugZod from "@common/slug";

const Base = z.object({
    // identifies the project being updated
    author: z.string(),
    slug: SlugZod,
});

export const FieldUpdate = Base.extend({
    action: z.literal("editFields"),

    // only the changed fields are sent; anything left out stays as-is
    projectName: z.string().min(1).optional(),
    projectSlug: SlugZod.optional(),
    projectDesc: z.string().optional(),
    summary: z.string().optional(),
});

export const SetUnlistedUpdate = Base.extend({
    action: z.literal("setUnlisted"),
    unlistedTo: z.boolean(),
});

export const Query = z.discriminatedUnion("action", [
    FieldUpdate,
    SetUnlistedUpdate,
]);

export type Query = z.infer<typeof Query>;
