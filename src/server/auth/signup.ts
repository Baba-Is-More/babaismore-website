import type { LoginQuery } from "@common/login/loginQuery";
import type { Context } from "@server/context";
import { db } from "@server/database";
import type { IUser } from "@server/database/models/user";
import { TRPCError } from "@trpc/server";
import type { HydratedDocument } from "mongoose";
import { comparePassword } from "./compare";
import type { SignupQuery } from "@common/signup/SignupQuery";
import { hashPassword } from "./hash";

export async function signup(query: SignupQuery) {
    // make sure neither the email or username is already taken
    const email_taken = await check_email(query.email);
    const username_taken = await check_username(query.username);

    if (email_taken) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Email already taken",
        });
    }

    if (username_taken) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Username already taken",
        });
    }

    // if not, we can make a new account

    const hashedPassword = await hashPassword(query.password);
    // TODO: make this not ugly
    const randomProfilePicture = "4c546671-0573-4895-926d-88800077b67d";

    const newUser: HydratedDocument<IUser> = new db.users({
        displayName: query.displayName,
        email: query.email,
        password: hashedPassword,
        username: query.username,
        profilePicture: randomProfilePicture,
    });

    await newUser.save();
}

// checks if the email is already taken or not
async function check_email(email: string): Promise<boolean> {
    const user: HydratedDocument<IUser> | null = await db.users.findOne({
        email: email,
    });

    if (user != null) {
        return false;
    } else {
        return true;
    }
}

// checks if the username is already taken or not
async function check_username(username: string): Promise<boolean> {
    const user: HydratedDocument<IUser> | null = await db.users.findOne({
        username: username,
    });

    if (user != null) {
        return false;
    } else {
        return true;
    }
}
