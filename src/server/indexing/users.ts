import { db } from "@server/database";
import type { IUser } from "@server/database/models/user";
import type { HydratedDocument } from "mongoose";

export async function usersToObjectId(users: string[]): Promise<IUser[]> {
    return await db.users.find({
        username: { $in: users },
    });
}

export async function userToObjectId(
    user: string,
): Promise<HydratedDocument<IUser> | null> {
    return await db.users.findOne({
        username: user,
    });
}
