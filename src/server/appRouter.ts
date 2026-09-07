import * as project from "@common/project";
import * as z from "zod";
import { fetchProject, searchProjects, userMe } from "./service";
import { publicProcedure, router } from "./trpc";
import { LoginQuery } from "@common/login/loginQuery";
import { MeResult } from "@common/users/MeResult";
import { login } from "./auth/login";
import { logout } from "./auth/logout";
import { SignupQuery } from "@common/signup/SignupQuery";
import { signup } from "./auth/signup";

export const userRouter = router({
    me: publicProcedure.output(MeResult).query(async (ctx) => {
        return userMe(ctx.ctx as any);
    }),
});

export const projectRouter = router({
    searchProjects: publicProcedure
        .input(project.search.Query)
        .output(z.array(project.search.Result))
        .query(async (ctx) => {
            return searchProjects(ctx.input);
        }),
    fetch: publicProcedure
        .input(project.fetch.Query)
        .output(project.fetch.Result)
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
