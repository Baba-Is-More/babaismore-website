import mongoose, { Schema, Types, type HydratedDocument } from "mongoose";
import { ProjectFileSchema } from "./projectFile";
import * as z from "zod";
import { TagZod, type ITag } from "./tag";
import { GalleryImageSchema, type IGalleryImage } from "./galleryImage";
import type { IUser } from "./user";
import { UserZod } from "./user";

export const ProjectZod = z.object({
    author: UserZod,
    projectName: z.string(),
    projectDesc: z.string(),
    downloads: z.number(),
    summary: z.string(),
    StarRatingAverage: z.number().min(0).max(5),
    StarRatingCount: z.number(),
    posted: z.coerce.date(),
    tags: z.array(TagZod),
});

export type PopulatedProject = HydratedDocument<
    Omit<IProject, "tags" | "author"> & {
        tags: ITag[];
        author: IUser;
    }
>;

export interface IProject {
    author: IUser;
    projectName: string;
    projectDesc: string;
    downloads: number;
    summary: string;
    posted: string;
    StarRatingAverage: number;
    StarRatingCount: number;
    tags: ITag[];
    galleryImages: IGalleryImage[];
}

export const ProjectSchema = new Schema<IProject>({
    author: {
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
    StarRatingAverage: {
        type: Number,
    },
    StarRatingCount: {
        type: Number,
    },
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
    // levelCodes: [LevelCodeSchema]
});
