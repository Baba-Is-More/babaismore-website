import { has_mongodb } from ".";
import { Project, Tag, User as UserModel } from "./models";
import lies from "../common/packs";
import userlies from "../common/users";
import type { SearchResult } from "@common/SearchResult";
import type { User } from "@common/User";

import {
    buildProjectsFilter,
    projectToSearchResult,
} from "./searching/searching";
import { buildFetchFilter } from "./searching/fetching";
import type { SearchQuery } from "@common/Search/SearchQuery";
import type {
    IProject,
    PopulatedProject,
    ProjectSchema,
} from "./models/project";
import type { Document, HydratedDocument } from "mongoose";
import type { ITag } from "./models/tag";
import type { FetchQuery } from "@common/fetch/fetchQuery";
import type { FetchResult } from "@common/fetch/FetchResult";
import { TRPCError } from "@trpc/server";
import type { IUser } from "./models/user";

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

export async function getTags() {
    return Tag.find();
}
