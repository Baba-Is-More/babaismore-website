import mongoose, { Schema } from "mongoose";
import { UserSchema, type IUser } from "./user";
import { ProjectSchema, type IProject } from "./project";
import { TagSchema, type ITag } from "./tag";
import { GalleryImageSchema, type IGalleryImage } from "./galleryImage";

export const User = mongoose.model<IUser>("User", UserSchema);
export const Project = mongoose.model<IProject>("Project", ProjectSchema);
export const Tag = mongoose.model<ITag>("Tag", TagSchema);
export const GalleryImage = mongoose.model<IGalleryImage>(
    "GalleryImage",
    GalleryImageSchema,
);
