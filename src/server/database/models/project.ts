import mongoose, { Schema, Types, type HydratedDocument } from "mongoose";
import { ReviewSchema } from "./review";
import { ProjectFileSchema } from "./projectFile";
import * as z from "zod";
import { TagZod, type ITag } from "./tag";
import { GalleryImageSchema, type IGalleryImage } from "./galleryImage";
import type { IUser } from "./user";
import { UserZod } from "./user";
import SlugZod, { SLUG_MAX_LENGTH, SLUG_REGEX } from "@common/slug";

export const ProjectZod = z.object({
    author: UserZod,
    projectName: z.string(),
    projectSlug: SlugZod,
    projectDesc: z.string(),
    downloads: z.number(),
    summary: z.string(),
    posted: z.coerce.date(),
    tags: z.array(TagZod),
    unlisted: z.boolean(),
});

export type PopulatedProjectPaths = {
    tags: HydratedDocument<ITag>[];
    author: HydratedDocument<IUser>;
};

export type PopulatedProject = Omit<
    HydratedDocument<IProject>,
    keyof PopulatedProjectPaths
> &
    PopulatedProjectPaths;

export interface IProject {
    author: IUser;
    projectName: string;
    projectSlug: string;
    projectDesc: string;
    downloads: number;
    summary: string;
    posted: string;
    unlisted: boolean;
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
    projectSlug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: SLUG_MAX_LENGTH,
        match: SLUG_REGEX,
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
    unlisted: {
        type: Boolean,
        default: false,
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
