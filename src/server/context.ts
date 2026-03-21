import { type CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import jwt from "jsonwebtoken";

export const createContext = async (opts: CreateHTTPContextOptions) => {
    async function getJwt() {
        //@ts-expect-error
        const token = opts.req.cookies?.token;

        if (!token) {
            return null;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!!);
            return decoded;
        } catch (err) {
            return null;
        }
    }

    const session_token = await getJwt();

    return {
        req: opts.req,
        res: opts.res,
        session_token,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
