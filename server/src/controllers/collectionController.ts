import mongoose from "mongoose";
import Collection from "../models/collection";

// All collection
export const allCollection = async (req: any, res: any) => {
  const id = req.user._id;
  try {
    const collection = await Collection.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ collection });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Add collection
export const addCollection = async (req: any, res: any) => {
  const { mediaId, title, mediaType, saveType, userId } = req.body;

  try {
    const singleItem = await Collection.create({
      mediaId,
      title,
      mediaType,
      saveType,
      userId,
    });
    res.status(200).json({ singleItem });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete collection
export const deleteCollection = async (req: any, res: any) => {
  const { id } = req.params;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid collection." });
  }

  try {
    const singleItem = await Collection.findOneAndDelete({ _id: id });
    res.status(200).json({ singleItem });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
