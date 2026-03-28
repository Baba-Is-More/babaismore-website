import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import session from "express-session";

export function createContext({ req, res }: CreateExpressContextOptions) {
    return {
        req,
        res,
        session: req.session as session.SessionData,
        user: req.user as Express.User,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
