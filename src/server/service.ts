import {
    buildProjectsFilter,
    projectToSearchResult,
} from "./searching/searching";
import { buildFetchFilter } from "./searching/fetching";
import type { SearchQuery } from "@common/Search/SearchQuery";
import type { PopulatedProject } from "./database/models/project";
import type { FetchQuery } from "@common/fetch/fetchQuery";
import type { FetchResult } from "@common/fetch/FetchResult";
import { TRPCError } from "@trpc/server";
import { db, type Database } from "./database";
import type { LoginQuery } from "@common/login/loginQuery";
import { userToObjectId } from "./indexing/users";
import { comparePassword } from "./auth/compare";
import type mongoose from "mongoose";
import type { MeResult } from "@common/users/MeResult";

export async function fetchProject(query: FetchQuery): Promise<FetchResult> {
    const filter = await buildFetchFilter(query);
    const project: PopulatedProject | null = await db.projects
        .findOne(filter)
        .populate("tags")
        .populate("author");

    if (!project) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "project not found",
        });
    }

    return {
        author: project.author.username,
        title: project.projectName,
        description: project.projectDesc,
        thumbnail: project.galleryImages[0]!!.imageName,
        tags: project.tags.map((v) => {
            return v.tagName;
        }),
    };
}

export async function searchProjects(query: SearchQuery) {
    const filter = await buildProjectsFilter(query);
    const projects: PopulatedProject[] = await db.projects
        .find(filter) // filter each project
        .populate("tags") //populate each tags with their respective objects
        .populate("author"); // populate each author

    const results = await Promise.all(projects.map(projectToSearchResult));

    return results;
}

export async function login(query: LoginQuery, res: any) {}

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
