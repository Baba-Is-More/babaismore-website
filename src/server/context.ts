import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req, res }: CreateExpressContextOptions) {
    return {
        req,
        res,
        //@ts-ignore
        session: req.session,
        //@ts-ignore
        user: req.user,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
