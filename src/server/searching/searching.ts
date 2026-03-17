import type { TagQuery } from "@common/Search/SearchQuery";
import { SortType, type SearchQuery } from "@common/Search/SearchQuery";
import type { SearchResult } from "@common/SearchResult";
import { Tag, type Project } from "@server/models";
import type { IProject } from "@server/models/project";
import type { ITag } from "@server/models/tag";
import type { HydratedDocument, ObjectId, QueryFilter } from "mongoose";

async function tagObjectIds(tags: TagQuery[]): Promise<ObjectId[]> {
    return await Tag.find({
        tagName: { $in: tags.map((v) => v.tag) },
    });
}

export async function buildProjectsFilter(
    query: SearchQuery,
): Promise<QueryFilter<IProject>> {
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

    return { $and: and };
}

export function projectToSearchResult(
    // the moment any typescript developer just throws their hands up and decides to make it any...
    // is a sad one...
    project: any, // really its type HydratedDocument<IProject>
): SearchResult {
    return {
        author: project.author,
        summary: project.summary,
        downloads: project.downloads,
        name: project.projectName,
        posted: new Date(project.posted),
        tags: project.tags.map((t: any) => t.tagName),
    };
}
