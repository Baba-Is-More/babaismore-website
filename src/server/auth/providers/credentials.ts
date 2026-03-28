import Credentials from "@auth/core/providers/credentials";
import * as z from "zod";

const validator = z.object({
    email: z.email(),
    password: z.string(),
});

function validate(
    credentials: Partial<Record<"email" | "password", unknown>>,
): boolean {
    const result = validator.safeParse(credentials);
    return result.success;
}

const provider = Credentials({
    credentials: {
        email: {},
        password: {},
    },

    async authorize(credentials, request) {
        throw "todo";
    },
});

export default provider;
