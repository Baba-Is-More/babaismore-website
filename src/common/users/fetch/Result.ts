import { ProfilePictureZod } from "@common/profilePicture";
import * as z from "zod";

export const Result = z.object({
    username: z.string(),
    displayName: z.string(),
    profilePicture: ProfilePictureZod,
    userIsYou: z.boolean(),
});

export type Result = z.infer<typeof Result>;
