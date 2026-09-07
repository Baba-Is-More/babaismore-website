import * as z from "zod";

export const UserFetchQuery = z.object({
    username: z.string(),
});

export type UserFetchQuery = z.infer<typeof UserFetchQuery>;
