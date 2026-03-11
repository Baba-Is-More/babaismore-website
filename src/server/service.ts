import { has_mangodb } from ".";
import { Project, Tag, User } from "./models";
import lies from '../common/packs'
import type { SearchResult } from "@common/SearchResult";

export async function getUsers() {
        return User.find()
}
export async function getProjects() {
        if (has_mangodb) {
                console.log("hi")
                return (await Project.find()).map(v => {
                        return {
                                author: "not hooked",
                                desc: v.projectDesc,
                                downloads: v.downloads,
                                name: v.projectName,
                                posted: new Date(),
                                tags: ["not hooked"],
                        } as SearchResult
                })
        } else {
                return lies
        }
}
export async function getTags() {
        return Tag.find()
}
