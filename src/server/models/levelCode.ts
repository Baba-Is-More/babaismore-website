import mongoose, { Schema } from "mongoose";

export const LevelCodeSchema = new Schema({
  levelCode: {
    type: String,
    required: true
  },
  thumbnailURL: {
    type: String,
    default: null
  },
  levelName: {
    type: String,
    required: true
  },
  levelSubtitle: {
    type: String,
    default: null
  },
  levelDescription: {
    type: String,
    default: null
  }
});