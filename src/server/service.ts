import type { User } from "@common/User";
import { Project, StarRating, Tag, User as UserModel } from "./models";

import { projectToObjectId } from "./indexing/project";
import type { FetchQuery } from "@common/fetch/fetchQuery";
import type { FetchResult } from "@common/fetch/FetchResult";
import type { SearchQuery } from "@common/search/SearchQuery";
import { TRPCError } from "@trpc/server";
import { buildFetchFilter } from "./helpers/fetching";
import {
    buildProjectsFilter,
    projectToSearchResult,
} from "./helpers/searching";
import type { PopulatedProject } from "./models/project";
import { createOrUpdateUserRating, updateStarRating } from "./helpers/stars";
import type { StarRateQuery } from "@common/rate/StarRateQuery";
import type { QueryFilter } from "mongoose";
import type { IStarRating } from "./models/starRating";
import { userToObjectId } from "./indexing/users";
import type { L } from "vue-router/dist/index-DFCq6eJK.js";

export async function getUsers(): Promise<User[]> {
    return (await UserModel.find()).map((v) => {
        return {
            avatar: v.profilePicture,
            id: v.username,
            name: v.displayName,
        } as User;
    });
}

export async function fetchProject(query: FetchQuery): Promise<FetchResult> {
    const filter = await buildFetchFilter(query);
    const project: PopulatedProject | null = await Project.findOne(filter)
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
        starCount: project.StarRatingAverage,
    };
}

export async function searchProjects(query: SearchQuery) {
    const filter = await buildProjectsFilter(query);
    const projects: PopulatedProject[] = await Project.find(filter) // filter each project
        .populate("tags") //populate each tags with their respective objects
        .populate("author"); // populate each author

    const results = await Promise.all(projects.map(projectToSearchResult));

    return results;
}

export async function starRate(query: StarRateQuery) {
    const author = await userToObjectId(query.author);
    if (!author) return;
    const project = await projectToObjectId(author, query.project);
    if (!project) return;
    const user = await userToObjectId(query.user);
    if (!user) return;
    await createOrUpdateUserRating(user, project, query.count);
    await updateStarRating(project);
}

export async function getTags() {
    return Tag.find();
}
