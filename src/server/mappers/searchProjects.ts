import type * as project from "@common/project";
import type { PopulatedProject } from "../database/models/project";
import type { ITag } from "../database/models/tag";
import type { HydratedDocument } from "mongoose";

export function projectToSearchResult(
    project: PopulatedProject,
): project.search.Result {
    return {
        author: project.author.username,
        slug: project.projectSlug,
        summary: project.summary,
        downloads: project.downloads,
        name: project.projectName,
        posted: new Date(project.posted),
        tags: project.tags.map(
            (t: HydratedDocument<ITag>): string => t.tagName,
        ),
    };
}
