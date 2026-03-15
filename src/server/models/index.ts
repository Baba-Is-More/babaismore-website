import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./user";
import { ProjectSchema, type IProject } from "./project";
import { TagSchema, type ITag } from "./tag";

export const User = mongoose.model("User", UserSchema);
export const Project = mongoose.model<IProject>("Project", ProjectSchema);
export const Tag = mongoose.model<ITag>("Tag", TagSchema);
