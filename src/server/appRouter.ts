import { getProjects, getTags, getUsers } from './service';
import { router, publicProcedure } from './trpc';

export const userRouter = router({
	getUsers: publicProcedure.query(async () => {
		return getUsers()
	})
})
export const projectRouter = router({
	getProjects: publicProcedure.query(async () => {
		return getProjects()
	})
})
export const tagRouter = router({
	getTags: publicProcedure.query(async () => {
		return getTags()
	})
})

export const appRouter = router({
	user: userRouter,
	project: projectRouter,
	tag: tagRouter
});

export type AppRouter = typeof appRouter;
