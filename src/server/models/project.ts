import mongoose, { Schema } from "mongoose";
import { GalleryImageSchema } from "./galleryImage";
import { ReviewSchema } from "./review";
import { ProjectFileSchema } from "./projectFile";
import { LevelCodeSchema } from "./levelCode";
import * as z from "zod";

export const ProjectZod = z.object({
  author: z.string(),
  projectName: z.string(),
  thumbnailURL: z.string(),
  projectDesc: z.string(),
  downloads: z.number(),
  summary: z.string(),
  posted: z.coerce.date(),
});

export const ProjectSchema = new Schema({
  author: {
    type: String,
  },
  projectName: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String,
    default: null,
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
    type: Date,
    required: true,
  },
  // distribution: {
  //         type: String,
  //         required: true
  // },
  // links: {
  //         type: [String],
  //         default: []
  // },
  // tags: [{
  //         type: Schema.Types.ObjectId,
  //         ref: "Tag"
  // }],

  // reviews: [ReviewSchema],
  // files: [ProjectFileSchema],
  // gallery: [GalleryImageSchema],
  // levelCodes: [LevelCodeSchema]
});
