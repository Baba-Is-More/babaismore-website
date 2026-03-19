import { Project } from "@server/models";
import type { IProject } from "@server/models/project";
import type { IUser } from "@server/models/user";
import type { HydratedDocument } from "mongoose";

export async function projectToObjectId(
    author: HydratedDocument<IUser>,
    name: string,
): Promise<HydratedDocument<IProject> | null> {
    return await Project.findOne({
        author: author,
        projectName: name,
    });
}
