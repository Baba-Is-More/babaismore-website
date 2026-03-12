import { has_mongodb } from ".";
import { Project, Tag, User as UserModel } from "./models";
import lies from "../common/packs";
import userlies from "../common/users";
import type { SearchResult } from "@common/SearchResult";
import type { User } from "@common/User";

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

export async function getProjects() {
    if (has_mongodb) {
        return (await Project.find()).map((v) => {
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
