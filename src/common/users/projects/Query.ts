import * as z from "zod";

export const Query = z.object({
    username: z.string(),
    visibility: z.enum(["public", "unlisted"]),
    page: z.number().int().min(0).default(0),
});

export type Query = z.infer<typeof Query>;
