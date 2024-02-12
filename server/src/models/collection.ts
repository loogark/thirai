import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userCollection = new Schema(
  {
    mediaId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mediaType: {
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
  },
  { timestamps: true }
);

export default mongoose.model("Collection", userCollection);
