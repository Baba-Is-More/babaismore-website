import mongoose, { Schema } from "mongoose";

export const GalleryImageSchema = new Schema({
    imageName: {
        type: String,
        required: true,
    },
});
