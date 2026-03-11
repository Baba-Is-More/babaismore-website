import mongoose, { Schema } from "mongoose";

export const ReviewSchema = new Schema({
  score: {
    type: Number,
    required: true,
    min: 0.0,
    max: 5.0
  },
  authorID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});