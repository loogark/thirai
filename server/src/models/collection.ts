import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userCollection = new Schema(
  {
    mediaId: {
      type: Number,
      required: true,
    },
    original_title: {
      type: String,
      required: true,
    },
    media_type: {
      type: String,
      required: true,
    },
    saveType: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: false,
    },
    profile_path: {
      type: String,
      required: false,
    },
    vote_average: {
      type: Number,
      required: false,
    },
    vote_count: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", userCollection);
