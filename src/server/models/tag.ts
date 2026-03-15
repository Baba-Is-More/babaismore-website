import mongoose, { Schema } from "mongoose";
import * as z from "zod";

export const TagZod = z.object({
    tagName: z.string(),
    tagIcon: z.string().optional(),
});

export interface ITag {
    tagName: string;
    tagIcon: string;
}

export const TagSchema = new Schema<ITag>({
    tagName: {
        type: String,
        required: true,
    },
    tagIcon: {
        type: String,
        required: false,
    },
});
