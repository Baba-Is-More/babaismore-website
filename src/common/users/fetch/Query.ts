import * as z from "zod";

export const Query = z.object({
    username: z.string(),
});

export type Query = z.infer<typeof Query>;
