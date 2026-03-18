import { User } from "@server/models";
import type { IUser } from "@server/models/user";

export async function usersToObjectId(users: string[]): Promise<IUser[]> {
    return await User.find({
        username: { $in: users },
    });
}

export async function userToObjectId(user: string): Promise<IUser | null> {
    return await User.findOne({
        username: user,
    });
}
