import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './appRouter';
import mongoose from 'mongoose';
import 'dotenv/config'
import process from 'process';

export let has_mangodb = false

if (process.env.DB_URL) {
	await mongoose.connect(process.env.DB_URL);
	has_mangodb = true;
} else {
	console.log("no db found on .env!");
	has_mangodb = false;
}

const server = createHTTPServer({
	router: appRouter,
	basePath: '/trpc/'
});

console.log("listening on http://localhost:3000...");
server.listen(3000);
