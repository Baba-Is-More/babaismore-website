import { FetchQuery } from "@common/fetch/fetchQuery";
import { FetchResult } from "@common/fetch/FetchResult";
import { SearchQuery } from "@common/Search/SearchQuery";
import { SearchResult } from "@common/Search/SearchResult";
import * as z from "zod";
import { fetchProject, searchProjects } from "./service";
import { publicProcedure, router } from "./trpc";

/* export const userRouter = router({
    getUsers: publicProcedure.output(z.array(UserZod)).query(async () => {
        return getUsers();
    }),
}) */

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

/* export const tagRouter = router({
    getTags: publicProcedure.query(async () => {
        return getTags();
    }),
}); */

export const appRouter = router({
    // user: userRouter,
    project: projectRouter,
    // tag: tagRouter,
});

export type AppRouter = typeof appRouter;
