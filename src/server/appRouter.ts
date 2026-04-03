import { FetchQuery } from "@common/fetch/fetchQuery";
import { FetchResult } from "@common/fetch/FetchResult";
import { SearchQuery } from "@common/Search/SearchQuery";
import { SearchResult } from "@common/Search/SearchResult";
import * as z from "zod";
import { fetchProject, searchProjects, userMe } from "./service";
import { publicProcedure, router } from "./trpc";
import { LoginQuery } from "@common/login/loginQuery";
import { MeResult } from "@common/users/MeResult";
import { login } from "./auth/login";
import { logout } from "./auth/logout";

export const userRouter = router({
    me: publicProcedure.output(MeResult).query(async (ctx) => {
        return userMe(ctx.ctx as any);
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
        return login(ctx.input, ctx.ctx);
    }),
    logout: publicProcedure.mutation(async (ctx) => {
        return logout(ctx.ctx);
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
