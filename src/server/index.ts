import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./appRouter";
import mongoose from "mongoose";
import "dotenv/config";
import process from "node:process";

let temp_has_mongodb = false;

if (process.env.DB_URL) {
    await mongoose.connect(process.env.DB_URL);
    temp_has_mongodb = true;
} else {
    console.log("no db found on .env!");
    // implied temp_has_mongodb = false;
}

export const has_mongodb = temp_has_mongodb;

const server = createHTTPServer({
    router: appRouter,
    basePath: "/trpc/",
});

console.log("listening on http://localhost:3000...");
server.listen(3000);
