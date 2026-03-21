import * as z from "zod";

export const LoginQuery = z.object({
    username: z.string(),
    plainPassword: z.string(),
});

export type LoginQuery = z.infer<typeof LoginQuery>;
