import { octetInputParser } from "@trpc/server/unstable-core-do-not-import";
import mongoose, { Schema } from "mongoose";
import * as z from "zod";

export const UserZod = z.object({
    username: z.string(),
    displayName: z.string(),
    profilePicture: z.string(),
    password: z.string(),
});

export interface IUser {
    username: string;
    displayName: string;
    profilePicture: string;
    password: string;
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
    },
    password: {
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
