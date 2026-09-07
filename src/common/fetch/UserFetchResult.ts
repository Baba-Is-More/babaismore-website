import { ProfilePictureZod } from "@common/users/ProfilePicture";
import * as z from "zod";

export const UserFetchResult = z.object({
    username: z.string(),
    displayName: z.string(),
    profilePicture: ProfilePictureZod,
    userIsYou: z.boolean(),
});

export type UserFetchResult = z.infer<typeof UserFetchResult>;
