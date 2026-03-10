import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './appRouter';

const server = createHTTPServer({
	router: appRouter,
});

console.log("listening on http://localhost:3000...");
server.listen(3000);
