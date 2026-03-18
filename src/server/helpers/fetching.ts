import type { FetchQuery } from "@common/fetch/fetchQuery";
import type { IProject } from "@server/models/project";
import type { QueryFilter } from "mongoose";
import { userToObjectId } from "../indexing/users";

export async function buildFetchFilter(
    query: FetchQuery,
): Promise<QueryFilter<IProject>> {
    const user = await userToObjectId(query.author);
    return { author: user, projectName: query.project };
}
