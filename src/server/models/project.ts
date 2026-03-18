import mongoose, { Schema, Types } from "mongoose";
import { ReviewSchema } from "./review";
import { ProjectFileSchema } from "./projectFile";
import * as z from "zod";
import { TagZod } from "./tag";
import { GalleryImageSchema, type IGalleryImage } from "./galleryImage";
import type { IUser } from "./user";
import { UserZod } from "./user";

export const ProjectZod = z.object({
    author: z.string(),
    authorId: UserZod,
    projectName: z.string(),
    projectDesc: z.string(),
    downloads: z.number(),
    summary: z.string(),
    posted: z.coerce.date(),
    tags: z.array(TagZod),
});

export interface IProject {
    author: string;
    authorId: IUser;
    projectName: string;
    projectDesc: string;
    downloads: number;
    summary: string;
    posted: string;
    tags: Types.ObjectId[];
    galleryImages: IGalleryImage[];
}

export const ProjectSchema = new Schema<IProject>({
    author: {
        type: String,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    projectName: {
        type: String,
        required: true,
    },
    projectDesc: {
        type: String,
        default: null,
    },
    downloads: {
        type: Number,
        default: 0,
        min: 0,
    },
    summary: {
        type: String,
        default: null,
    },
    posted: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    galleryImages: {
        type: [GalleryImageSchema],
    },
    // distribution: {
    //     type: String,
    //     required: true
    // },
    // links: {
    //     type: [String],
    //     default: []
    // },

    // contributors: {
    //     type: [String],
    //     default: []
    // }

    // reviews: [ReviewSchema],
    // files: [ProjectFileSchema],
    // gallery: [GalleryImageSchema],
    // levelCodes: [LevelCodeSchema]
});
