import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./appRouter";
import mongoose from "mongoose";
import "dotenv/config";
import process from "node:process";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import path from "node:path";
import { createContext } from "./context";
import cookieParser from "cookie-parser";
import { ExpressAuth } from "@auth/express";
import { DBAdapter } from "./auth/database_adaptor";
import Credentials from "./auth/providers/credentials";

if (process.env.DB_URL) {
    await mongoose.connect(process.env.DB_URL);
} else {
    throw "no db found on .env! please create a key 'DB_URL' with 'mongodb+srv://' url";
}

export const is_dev = true;

const app = express();
app.use(cookieParser());
app.set("trust proxy", true); // needed because we are serving with a proxy
app.use(
    "/auth",
    ExpressAuth({
        adapter: DBAdapter(),
        session: {
            strategy: "database",
        },
        providers: [Credentials],
        secret: process.env.AUTH_SECRET!!,
    }),
);

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: createContext,
    }),
);

app.use(
    "/uploads",
    express.static(path.join(import.meta.dirname, "../../", "app/", "uploads")),
);

console.log("listening on http://localhost:3000...");
app.listen(3000);
