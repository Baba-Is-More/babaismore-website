import type * as project from "@common/project";
import type { QueryFilter } from "mongoose";
import type { IProject } from "../database/models/project";
import { tagsToObjectId } from "../database/queries";

export async function buildProjectsFilter(
    query: project.search.Query,
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

    return { unlisted: false, $and: and };
}
