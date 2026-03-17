import type { FetchQuery } from "@common/fetch/fetchQuery";
import type { IProject } from "@server/models/project";
import type { QueryFilter } from "mongoose";

export async function buildFetchFilter(
    query: FetchQuery,
): Promise<QueryFilter<IProject>> {
    return { author: query.author, projectName: query.project };
}
