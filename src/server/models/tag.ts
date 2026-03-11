import mongoose, { Schema } from "mongoose";

export const TagSchema = new Schema({
        tagName: {
                type: String,
                required: true
        },
        tagIcon: {
                type: String,
                required: true
        }
});
