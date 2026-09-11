import mongoose, { Schema, type HydratedDocument } from "mongoose";
import * as z from "zod";

export const ProjectFileZod = z.object({
    fileName: z.string(),
    fileDate: z.coerce.date(),
    fileDesc: z.string().nullable(),
    version: z.string(),
});

export interface IProjectFile {
    fileName: string;
    fileDate: Date;
    fileDesc: string | null;
    version: string;
}

export type ProjectFileDocument = HydratedDocument<IProjectFile>;

export const ProjectFileSchema = new Schema<IProjectFile>({
    fileName: {
        type: String,
        required: true,
    },
    fileDate: {
        type: Date,
        required: true,
    },
    fileDesc: {
        type: String,
        default: null,
    },
    version: {
        type: String,
        required: true,
    },
});
