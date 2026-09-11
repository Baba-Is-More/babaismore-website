import * as project from "@common/project";
import * as z from "zod";
import {
    createProject,
    fetchProject,
    fetchUser,
    login,
    logout,
    searchProjects,
    signup,
    updateProject,
    uploadProject,
    userMe,
} from "./service";
import { publicProcedure, router } from "./trpc";
import { LoginQuery } from "@common/login/loginQuery";
import { MeResult } from "@common/users/MeResult";
import { UserFetchQuery } from "@common/fetch/UserFetchQuery";
import { UserFetchResult } from "@common/fetch/UserFetchResult";
import { SignupQuery } from "@common/signup/SignupQuery";

export const userRouter = router({
    me: publicProcedure.output(MeResult).query(async (ctx) => {
        return userMe(ctx.ctx.user);
    }),
    fetch: publicProcedure
        .input(UserFetchQuery)
        .output(UserFetchResult)
        .query(async (ctx) => {
            return fetchUser(ctx.input, ctx.ctx.user);
        }),
});

export const projectRouter = router({
    search: publicProcedure
        .input(project.search.Query)
        .output(z.array(project.search.Result))
        .query(async (ctx) => {
            return searchProjects(ctx.input);
        }),
    fetch: publicProcedure
        .input(project.fetch.Query)
        .output(project.fetch.Result)
        .query(async (ctx) => {
            return fetchProject(ctx.input, ctx.ctx.user);
        }),
    create: publicProcedure
        .input(project.create.Query)
        .mutation(async (ctx) => {
            return createProject(ctx.input, ctx.ctx.user);
        }),
    update: publicProcedure
        .input(project.update.Query)
        .mutation(async (ctx) => {
            return updateProject(ctx.input, ctx.ctx.user);
        }),
    upload: publicProcedure
        .input(project.upload.Query)
        .mutation(async (ctx) => {
            return await uploadProject(ctx.input, ctx.ctx.user);
        }),
});

export const authRouter = router({
    login: publicProcedure.input(LoginQuery).mutation(async (ctx) => {
        return login(ctx.input, ctx.ctx);
    }),
    logout: publicProcedure.mutation(async (ctx) => {
        return logout(ctx.ctx);
    }),
    signup: publicProcedure.input(SignupQuery).mutation(async (ctx) => {
        return signup(ctx.input);
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
