import mongoose, { Schema } from "mongoose";
import * as z from "zod";
import { UserZod, type IUser } from "./user";
import { ProjectZod, type IProject } from "./project";

export const StarRatingZod = z.object({
    author: UserZod,
    project: ProjectZod,
    score: z.number().min(0).max(5),
});

export interface IStarRating {
    author: IUser;
    project: IProject;
    score: number;
}

export const StarRatingSchema = new Schema<IStarRating>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
});
