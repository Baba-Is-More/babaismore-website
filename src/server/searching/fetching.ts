import type * as project from "@common/project";
import type { IProject } from "@server/database/models/project";
import type { QueryFilter } from "mongoose";
import { userToObjectId } from "../indexing/users";

export async function buildFetchFilter(
    query: project.fetch.Query,
): Promise<QueryFilter<IProject>> {
    const user = await userToObjectId(query.author);
    return { author: user, projectSlug: query.slug };
}
