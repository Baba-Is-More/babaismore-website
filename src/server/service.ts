import {
    buildProjectsFilter,
    projectToSearchResult,
} from "./searching/searching";
import { buildFetchFilter } from "./searching/fetching";
import type * as project from "@common/project";
import type { PopulatedProject } from "./database/models/project";
import { TRPCError } from "@trpc/server";
import { db, type Database } from "./database";
import type { LoginQuery } from "@common/login/loginQuery";
import { userToObjectId } from "./indexing/users";
import { comparePassword } from "./auth/compare";
import type mongoose from "mongoose";
import type { MeResult } from "@common/users/MeResult";

export async function fetchProject(
    query: project.fetch.Query,
): Promise<project.fetch.Result> {
    const filter = await buildFetchFilter(query);
    const found: PopulatedProject | null = await db.projects
        .findOne(filter)
        .populate("tags")
        .populate("author");

    if (!found) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "project not found",
        });
    }

    return {
        author: found.author.username,
        title: found.projectName,
        description: found.projectDesc,
        thumbnail: found.galleryImages[0]!!.imageName,
        tags: found.tags.map((v) => {
            return v.tagName;
        }),
    };
}

export async function searchProjects(query: project.search.Query) {
    const filter = await buildProjectsFilter(query);
    const projects: PopulatedProject[] = await db.projects
        .find(filter) // filter each project
        .populate("tags") //populate each tags with their respective objects
        .populate("author"); // populate each author

    const results = await Promise.all(projects.map(projectToSearchResult));

    return results;
}

export async function userMe(ctx: any): Promise<MeResult> {
    if (ctx.user == null) return { is_logged_in: false };

    const id = ctx.user.id as mongoose.Types.ObjectId;
    const user = await db.users.findById(id);

    if (!user) return { is_logged_in: false };

    return {
        is_logged_in: true,
        data: {
            displayName: user.displayName,
            profilePicture: user.profilePicture,
            username: user.username,
        },
    };
}
