import { db } from "../database";
import type { PopulatedUser } from "../database/models/user";

// checks if the email is already taken or not
export async function checkEmail(email: string): Promise<boolean> {
    const user: PopulatedUser | null = await db.users.findOne({
        email: email,
    });

    if (user == null) {
        return false;
    } else {
        return true;
    }
}

// checks if the username is already taken or not
export async function checkUsername(username: string): Promise<boolean> {
    const user: PopulatedUser | null = await db.users.findOne({
        username: username,
    });

    if (user == null) {
        return false;
    } else {
        return true;
    }
}
