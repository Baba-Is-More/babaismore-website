import mongoose, { Schema } from "mongoose";
import * as z from "zod";

export const TagZod = z.object({
    tagName: z.string(),
    tagIcon: z.string().optional(),
});

export const TagSchema = new Schema({
    tagName: {
        type: String,
        required: true,
    },
    tagIcon: {
        type: String,
        required: false,
    },
});
