import type { QueryFilter } from "mongoose";
import type { IProject } from "../database/models/project";
import { userToObjectId } from "../database/queries";
import type { PopulatedUser } from "@server/database/models/user";

export async function buildFetchFilter(
    author: string,
    slug: string,
): Promise<QueryFilter<IProject>> {
    const user = await userToObjectId(author);
    return { author: user, projectSlug: slug };
}

export async function buildUserProjectFetchFilter(
    user: PopulatedUser,
    visibility: "public" | "unlisted",
): Promise<QueryFilter<IProject>> {
    return { author: user, unlisted: visibility == "public" ? false : true };
}
