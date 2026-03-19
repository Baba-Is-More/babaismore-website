import { User } from "@server/models";
import type { IUser } from "@server/models/user";
import type { HydratedDocument } from "mongoose";

export async function usersToObjectId(
    users: string[],
): Promise<HydratedDocument<IUser>[]> {
    return await User.find({
        username: { $in: users },
    });
}

export async function userToObjectId(
    user: string,
): Promise<HydratedDocument<IUser> | null> {
    return await User.findOne({
        username: user,
    });
}
