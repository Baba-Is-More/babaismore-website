import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./appRouter";
import mongoose from "mongoose";
import "dotenv/config";
import process from "node:process";
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import path from "node:path";

let temp_has_mongodb = false;

if (process.env.DB_URL) {
    await mongoose.connect(process.env.DB_URL);
    temp_has_mongodb = true;
} else {
    console.log("no db found on .env!");
    // implied temp_has_mongodb = false;
}

export const has_mongodb = temp_has_mongodb;

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

app.use(
	"/uploads", 
	express.static(path.join(import.meta.dirname, "../../", "uploads"))
);

console.log("listening on http://localhost:3000...");
app.listen(3000);