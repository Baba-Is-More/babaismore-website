import { router } from './trpc';


import { publicProcedure } from './trpc';

export const appRouter = router({
	test: publicProcedure
		.query(async () => {
			return "a";
		}),
});

export type AppRouter = typeof appRouter;
