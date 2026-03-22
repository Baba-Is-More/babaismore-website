import * as z from "zod";

// if we are logged in, is_logged_in field MUST be true and data MUST exist
const LoggedIn = z.object({
    is_logged_in: z.literal(true),
    data: z.object({
        username: z.string(),
        profilePicture: z.string(),
        displayName: z.string(),
    }),
});

// if not, data is irrelevant
const LoggedOut = z.object({
    is_logged_in: z.literal(false),
});

// zod magic here: it turns the two result fields into one union
// said union is based on the value of "is_logged_in"
export const MeResult = z.discriminatedUnion("is_logged_in", [
    LoggedIn,
    LoggedOut,
]);

export type MeResult = z.infer<typeof MeResult>;
