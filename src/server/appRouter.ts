import * as project from "@common/project";
import * as user from "@common/users";
import * as z from "zod";
import {
    createProject,
    fetchAllProjectFiles,
    fetchLatestProjectFile,
    fetchOneProjectFile,
    fetchProject,
    fetchUser,
    fetchUserProjects,
    login,
    logout,
    searchProjects,
    signup,
    updateProject,
    updateProjectFile,
    uploadProject,
    userMe,
} from "./service";
import { publicProcedure, router } from "./trpc";
import { LoginQuery } from "@common/login/loginQuery";
import { SignupQuery } from "@common/signup/SignupQuery";

export const userRouter = router({
    me: publicProcedure.output(user.me.Result).query(async (ctx) => {
        return userMe(ctx.ctx.user);
    }),
    fetch: publicProcedure
        .input(user.fetch.Query)
        .output(user.fetch.Result)
        .query(async (ctx) => {
            return fetchUser(ctx.input, ctx.ctx.user);
        }),
    projects: publicProcedure
        .input(user.projects.Query)
        .output(user.projects.Result)
        .query(async (ctx) => {
            return fetchUserProjects(ctx.input, ctx.ctx.user);
        }),
});

export const projectFilesRouter = router({
    getAll: publicProcedure
        .input(project.files.getAll.Query)
        .output(project.files.getAll.Result)
        .query(async (ctx) => {
            return fetchAllProjectFiles(ctx.input, ctx.ctx.user);
        }),
    getOne: publicProcedure
        .input(project.files.getOne.Query)
        .output(project.files.getOne.Result)
        .query(async (ctx) => {
            return fetchOneProjectFile(ctx.input, ctx.ctx.user);
        }),
    getLatest: publicProcedure
        .input(project.files.getLatest.Query)
        .output(project.files.getLatest.Result)
        .query(async (ctx) => {
            return fetchLatestProjectFile(ctx.input, ctx.ctx.user);
        }),
    update: publicProcedure
        .input(project.files.update.Query)
        .mutation(async (ctx) => {
            return updateProjectFile(ctx.input, ctx.ctx.user);
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
    files: projectFilesRouter,
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
