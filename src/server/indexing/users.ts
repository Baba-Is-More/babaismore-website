import { db } from "@server/database";
import type { IUser } from "@server/database/models/user";

export async function usersToObjectId(users: string[]): Promise<IUser[]> {
    return await db.users.find({
        username: { $in: users },
    });
}

export async function userToObjectId(user: string): Promise<IUser | null> {
    return await db.users.findOne({
        username: user,
    });
}
