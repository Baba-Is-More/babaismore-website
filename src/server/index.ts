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

if (process.env.DB_URL) {
    await mongoose.connect(process.env.DB_URL);
} else {
    throw "no db found on .env! please create a key 'DB_URL' with 'mongodb+srv://' url";
}

export const is_dev = true;

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET!!,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.post(
    "/auth/login",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
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
