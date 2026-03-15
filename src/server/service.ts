import { has_mongodb } from ".";
import { Project, Tag, User as UserModel } from "./models";
import lies from "../common/packs";
import userlies from "../common/users";
import type { SearchResult } from "@common/SearchResult";
import type { User } from "@common/User";
import type { SearchQuery, TagQuery } from "@common/Search/SearchQuery";
import type { ObjectId, QueryFilter } from "mongoose";

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

async function tagObjectIds(tags: TagQuery[]): Promise<ObjectId[]> {
    return await Tag.find({
        tagName: { $in: tags.map((v) => v.tag) },
    });
}

async function buildProjectsFilter(
    query: SearchQuery,
): Promise<QueryFilter<typeof Project>> {
    const and = [];
    if (query.keywords.length) {
        for (const kw of query.keywords) {
            and.push({
                projectName: { $regex: kw, $options: "i" },
            });
        }
    }
    if (query.tags.length) {
        const includes = query.tags.filter((t) => !t.is_negated);
        const excludes = query.tags.filter((t) => t.is_negated);
        const includes_ids = await tagObjectIds(includes);
        const excludes_ids = await tagObjectIds(excludes);
        for (const id of includes_ids) {
            and.push({
                tags: id,
            });
        }
        for (const id of excludes_ids) {
            and.push({
                $not: {
                    tags: id,
                },
            });
        }
    }

    console.log(and);

    return { $and: and };
}

export async function getProjects(query: SearchQuery) {
    if (has_mongodb) {
        const projects = await Project.find(await buildProjectsFilter(query));

        const results = await Promise.all(
            projects.map(async (v) => {
                const tags = await Tag.find({ _id: { $in: v.tags } });
                return {
                    author: v.author,
                    desc: v.projectDesc,
                    downloads: v.downloads,
                    name: v.projectName,
                    posted: new Date(v.posted),
                    tags: tags.map((t) => t.tagName),
                } as SearchResult;
            }),
        );

        return results;
    } else {
        return lies;
    }
}

export async function getTags() {
    return Tag.find();
}
