import { has_mongodb } from ".";
import { Project, Tag, User as UserModel } from "./models";
import lies from "../common/packs";
import userlies from "../common/users";
import type { SearchResult } from "@common/SearchResult";
import type { User } from "@common/User";
import type { SearchQuery } from "@common/Search/SearchQuery";
import type { QueryFilter } from "mongoose";

export async function getUsers(): Promise<User[]> {
    if (has_mongodb) {
        return (await UserModel.find()).map((v) => {
            return {
                avatar: v.profilePicture,
                id: v.username,
                name: v.displayName,
            } as User;
        });
    } else {
        return userlies;
    }
}

function buildProjectsFilter(query: SearchQuery): QueryFilter<typeof Project> {
    const and = [];
    if (query.keywords.length) {
        for (const kw of query.keywords) {
            and.push({
                projectName: { $regex: kw, $options: "i" },
            });
        }
    }

    return { $and: and };
}

export async function getProjects(query: SearchQuery) {
    if (has_mongodb) {
        return (await Project.find(buildProjectsFilter(query))).map((v) => {
            return {
                author: v.author,
                desc: v.projectDesc,
                downloads: v.downloads,
                name: v.projectName,
                posted: new Date(v.posted),
                tags: ["not hooked"],
            } as SearchResult;
        });
    } else {
        return lies;
    }
}
export async function getTags() {
    return Tag.find();
}
