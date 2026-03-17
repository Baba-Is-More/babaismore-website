import { Schema } from "mongoose";
import * as z from "zod";

export const GalleryImageZod = z.object({
    imageName: z.uuidv4(),
    imageAlt: z.string().optional(),
});

export interface IGalleryImage {
    imageName: string;
    imageAlt?: string;
}

export const GalleryImageSchema = new Schema<IGalleryImage>({
    imageName: {
        type: String,
        required: true,
    },
    imageAlt: {
        type: String,
        required: false,
    },
});
