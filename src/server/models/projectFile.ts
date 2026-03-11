import mongoose, { Schema } from "mongoose";

export const ProjectFileSchema = new Schema({
  fileName: {
    type: String,
    required: true
  },
  fileDate: {
    type: Date,
    required: true
  },
  fileDesc: {
    type: String,
    default: null
  },
  version: {
    type: String,
    required: true
  }
});
