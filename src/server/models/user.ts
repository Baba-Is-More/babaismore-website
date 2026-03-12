import { octetInputParser } from "@trpc/server/unstable-core-do-not-import";
import mongoose, { Schema } from "mongoose";

export const UserSchema = new mongoose.Schema({
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
