import type { QueryFilter } from "mongoose";
import type { IProject } from "../database/models/project";
import { userToObjectId } from "../database/queries";

export async function buildFetchFilter(
    author: string,
    slug: string,
): Promise<QueryFilter<IProject>> {
    const user = await userToObjectId(author);
    return { author: user, projectSlug: slug };
}

export async function buildUserProjectFetchFilter(): Promise<
    QueryFilter<IProject>
> {
    return {};
}
