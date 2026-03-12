import { ProjectSchema, ProjectZod } from "./models/project";
import { Project } from "./models";
import { getProjects, getTags, getUsers } from "./service";
import { router, publicProcedure } from "./trpc";
import * as z from "zod";

export const userRouter = router({
    getUsers: publicProcedure.query(async () => {
        return getUsers();
    }),
});

export const projectRouter = router({
    getProjects: publicProcedure.query(async () => {
        return getProjects();
    }),
    newProject: publicProcedure.input(ProjectZod).mutation(async (ctx) => {
        const project = ctx.input;
        const proj = new Project({
            projectName: project.projectName,
            thumbnailURL: project.thumbnailURL,
            projectDesc: project.projectDesc,
            downloads: project.downloads,
            summary: project.summary,
            author: project.author,
            posted: project.posted,
        });
        proj.save();
        return true;
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
