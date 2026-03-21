import { FetchQuery } from "@common/fetch/fetchQuery";
import { FetchResult } from "@common/fetch/FetchResult";
import { SearchQuery } from "@common/Search/SearchQuery";
import { SearchResult } from "@common/Search/SearchResult";
import * as z from "zod";
import { fetchProject, login, searchProjects, userMe } from "./service";
import { publicProcedure, router } from "./trpc";
import { LoginQuery } from "@common/login/loginQuery";

export const userRouter = router({
    me: publicProcedure.query(async (ctx) => {
        return userMe(ctx.ctx.session_token as any);
    }),
});

export const projectRouter = router({
    searchProjects: publicProcedure
        .input(SearchQuery)
        .output(z.array(SearchResult))
        .query(async (ctx) => {
            return searchProjects(ctx.input);
        }),
    fetch: publicProcedure
        .input(FetchQuery)
        .output(FetchResult)
        .query(async (ctx) => {
            return fetchProject(ctx.input);
        }),
});

export const authRouter = router({
    login: publicProcedure.input(LoginQuery).mutation(async (ctx) => {
        return login(ctx.input, ctx.ctx.res as any);
    }),
});

/* export const tagRouter = router({
    getTags: publicProcedure.query(async () => {
        return getTags();
    }),
}); */

export const appRouter = router({
    user: userRouter,
    project: projectRouter,
    // tag: tagRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
