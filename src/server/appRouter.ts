import { ProjectSchema, ProjectZod } from "./models/project";
import { Project } from "./models";
import {
    searchProjects,
    getTags,
    getUsers,
    fetchProject,
    starRate,
} from "./service";
import { router, publicProcedure } from "./trpc";
import * as z from "zod";
import { UserZod } from "@common/User";
import { SearchQuery } from "@common/search/SearchQuery";
import { SearchResult } from "@common/search/SearchResult";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { FetchQuery } from "@common/fetch/fetchQuery";
import { FetchResult } from "@common/fetch/FetchResult";
import { StarRateQuery } from "@common/rate/StarRateQuery";

export const userRouter = router({
    getUsers: publicProcedure.output(z.array(UserZod)).query(async () => {
        return getUsers();
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
    starRate: publicProcedure.input(StarRateQuery).mutation(async (ctx) => {
        starRate(ctx.input);
    }),
});

export const tagRouter = router({
    getTags: publicProcedure.query(async () => {
        return getTags();
    }),
});

export const appRouter = router({
    user: userRouter,
    project: projectRouter,
    tag: tagRouter,
});

export type AppRouter = typeof appRouter;
