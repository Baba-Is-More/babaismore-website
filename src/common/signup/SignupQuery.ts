import * as z from "zod";

export const SignupQuery = z.object({
    displayName: z.string(),
    username: z.string(),
    password: z.string(),
    email: z.email(),
});

export type SignupQuery = z.infer<typeof SignupQuery>;
