import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./user";
import { ProjectSchema } from "./project";
import { TagSchema } from "./tag";

export const User = mongoose.model("User", UserSchema);
export const Project = mongoose.model("Project", ProjectSchema);
export const Tag = mongoose.model("Tag", TagSchema);