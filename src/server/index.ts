import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./appRouter";
import mongoose from "mongoose";
import "dotenv/config";
import process from "node:process";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import path from "node:path";
import { createContext } from "./context";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

let temp_has_mongodb = false;

if (process.env.DB_URL) {
    // note: you need to add your own `.env` file to the root of the project with DB_URL
    await mongoose.connect(process.env.DB_URL);
    temp_has_mongodb = true;
} else {
    throw "no db found on .env! please create a key 'DB_URL' with 'mongodb+srv://' url";
    // implied temp_has_mongodb = false;
}

export const has_mongodb = temp_has_mongodb;
export const is_dev = true;

const app = express();
app.use(cookieParser());

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: createContext,
    }),
);

app.use(
    "/uploads",
    express.static(path.join(import.meta.dirname, "../../", "uploads")),
);

console.log("listening on http://localhost:3000...");
app.listen(3000);
