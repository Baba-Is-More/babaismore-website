import type { QueryFilter, Types } from "mongoose";
import { db } from "./index";
import type {
    IProject,
    PopulatedProject,
    PopulatedProjectPaths,
} from "./models/project";
import type { ITag } from "./models/tag";
import type { IUser, PopulatedUser } from "./models/user";

export async function getOneProject(
    filter: QueryFilter<IProject>,
): Promise<PopulatedProject | null> {
    return await db.projects
        .findOne(filter)
        .populate<PopulatedProjectPaths>("tags author");
}

export async function getManyProjects(
    filter: QueryFilter<IProject>,
): Promise<PopulatedProject[]> {
    return await db.projects
        .find(filter)
        .populate<PopulatedProjectPaths>("tags author");
}

export async function upsertTag(tagName: string): Promise<Types.ObjectId> {
    const tag = await db.tags.findOneAndUpdate(
        { tagName },
        { $setOnInsert: { tagName } },
        { upsert: true, new: true },
    );
    if (!tag) throw new Error(`failed to upsert tag "${tagName}"`);
    return tag._id;
}

export async function tagsToObjectId(tags: string[]): Promise<ITag[]> {
    return await db.tags.find({
        tagName: { $in: tags },
    });
}

export async function usersToObjectId(users: string[]): Promise<IUser[]> {
    return await db.users.find({
        username: { $in: users },
    });
}

export async function userToObjectId(
    user: string,
): Promise<PopulatedUser | null> {
    return await db.users.findOne({
        username: user,
    });
}
