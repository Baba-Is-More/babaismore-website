import { has_mongodb } from ".";
import { Project, Tag, User } from "./models";
import lies from "../common/packs";
import type { SearchResult } from "@common/SearchResult";

export async function getUsers() {
    return User.find();
}
export async function getProjects() {
    if (has_mongodb) {
        console.log("hi");
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
