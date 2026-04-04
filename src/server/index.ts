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
import session from "express-session";
import passport from "passport";
import "./auth/passport";
import MongoStore from "connect-mongo";

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

// express-session initialization
app.use(
    session({
        secret: process.env.SECRET!!,
        resave: false,
        saveUninitialized: false,
        // lets mongodb store the sessions (by default its in-memory)
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
            collectionName: "sessions",
        }),
        // cookie: {
        // maxAge: 1000 * 60 * 60 * 24, // one day
        // },
    }),
);

// passport middleware initialization
app.use(passport.initialize());
app.use(passport.session());

// TRPC endpoint
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
