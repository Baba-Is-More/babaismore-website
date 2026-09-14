import type * as user from "@common/users";
import type { PopulatedProject } from "../database/models/project";
import type { ITag } from "../database/models/tag";

export function projectToUserProjectsResultItem(
    project: PopulatedProject,
): user.projects.ResultItem {
    return {
        author: project.author.username,
        name: project.projectName,
        slug: project.projectSlug,
        summary: project.summary,
        downloads: project.downloads,
        posted: new Date(project.posted),
        tags: project.tags.map((t: ITag): string => t.tagName),
    };
}
