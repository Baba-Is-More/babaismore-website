import type * as project from "@common/project";
import type { PopulatedProject } from "../database/models/project";
import type { ITag } from "../database/models/tag";

export function projectToFetchResult(
    project: PopulatedProject,
    allowEdit: boolean,
): project.fetch.Result {
    return {
        author: project.author.username,
        title: project.projectName,
        slug: project.projectSlug,
        description: project.projectDesc,
        summary: project.summary,
        thumbnail: project.galleryImages[0]?.imageName,
        tags: project.tags.map((v: ITag): string => v.tagName),
        editable: allowEdit,
    };
}
