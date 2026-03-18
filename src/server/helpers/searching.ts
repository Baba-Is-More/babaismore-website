import type { TagQuery } from "@common/Search/SearchQuery";
import { SortType, type SearchQuery } from "@common/Search/SearchQuery";
import type { SearchResult } from "@common/SearchResult";
import { Tag, type Project } from "@server/models";
import type { IProject, PopulatedProject } from "@server/models/project";
import type { ITag } from "@server/models/tag";
import type { HydratedDocument, ObjectId, QueryFilter } from "mongoose";
import { tagsToObjectId } from "../indexing/tags";

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
        const includes = query.tags
            .filter((t) => !t.is_negated)
            .map((v) => v.tag);
        const excludes = query.tags
            .filter((t) => t.is_negated)
            .map((v) => v.tag);
        const includes_ids = await tagsToObjectId(includes);
        const excludes_ids = await tagsToObjectId(excludes);
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

export function projectToSearchResult(project: PopulatedProject): SearchResult {
    return {
        author: project.author.username,
        summary: project.summary,
        downloads: project.downloads,
        name: project.projectName,
        posted: new Date(project.posted),
        tags: project.tags.map((t: any) => t.tagName),
    };
}
