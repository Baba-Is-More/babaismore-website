import { ProfilePictureZod, type ProfilePicture } from "@common/users/ProfilePicture";
import { octetInputParser } from "@trpc/server/unstable-core-do-not-import";
import mongoose, { Schema } from "mongoose";
import * as z from "zod";

export const UserZod = z.object({
    username: z.string(),
    displayName: z.string(),
    profilePicture: ProfilePictureZod,
    password: z.string(),
    email: z.email(),
});

export interface IUser {
    username: string;
    displayName: string;
    profilePicture: ProfilePicture;
    password: string;
    email: string;
}

export const UserSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        match: /[a-zA-Z0-9._-]/,
    },
    displayName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) =>
                ProfilePictureZod.safeParse(value).success,
            message: (props) =>
                `${props.value} is not a valid profile picture (expected "default:<name>" or "custom:<uuid>")`,
        },
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    /*     pronouns: {
        type: String,
        required: true,
    },
    links: {
        type: [String],
        default: [],
    },
    isServerSide: {
        type: Boolean,
        required: true,
        default: false,
    }, */
});
