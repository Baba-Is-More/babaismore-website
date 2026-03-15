import { has_mongodb } from ".";
import { Project, Tag, User as UserModel } from "./models";
import lies from "../common/packs";
import userlies from "../common/users";
import type { SearchResult } from "@common/SearchResult";
import type { User } from "@common/User";

import { buildProjectsFilter, projectToSearchResult } from "./searching/utils";
import type { SearchQuery } from "@common/Search/SearchQuery";
import type { IProject, ProjectSchema } from "./models/project";
import type { Document, HydratedDocument } from "mongoose";
import type { ITag } from "./models/tag";

export async function getUsers(): Promise<User[]> {
    return (await UserModel.find()).map((v) => {
        return {
            avatar: v.profilePicture,
            id: v.username,
            name: v.displayName,
        } as User;
    });
}

export async function getProjects(query: SearchQuery) {
    const filter = await buildProjectsFilter(query);
    const projects = await Project.find(filter) // filter each project
        .populate<{ tags: ITag[] }>("tags"); //populate each tags with their respective objects

    const results = await Promise.all(projects.map(projectToSearchResult));

    return results;
}

export async function getTags() {
    return Tag.find();
}
