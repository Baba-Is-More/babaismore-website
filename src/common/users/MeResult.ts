import * as z from "zod";

export const MeResult = z.object({
    username: z.string(),
    profilePicture: z.string(),
    displayName: z.string(),
});

export type MeResult = z.infer<typeof MeResult>;
