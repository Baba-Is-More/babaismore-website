import type { User } from "@common/User";
import { Project, Tag, User as UserModel } from "./models";

import type { FetchQuery } from "@common/fetch/fetchQuery";
import type { FetchResult } from "@common/fetch/FetchResult";
import type { SearchQuery } from "@common/Search/SearchQuery";
import { TRPCError } from "@trpc/server";
import { buildFetchFilter } from "./helpers/fetching";
import {
    buildProjectsFilter,
    projectToSearchResult,
} from "./helpers/searching";
import type { PopulatedProject } from "./models/project";
import {} from "./helpers/stars";

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
