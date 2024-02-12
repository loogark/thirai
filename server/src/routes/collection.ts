import express from "express";
import {
  addCollection,
  allCollection,
  deleteCollection,
} from "../controllers/collectionController";

const router = express.Router();

// Get all collection
router.get("/collection", allCollection);

// Add collection
router.post("/collection", addCollection);

// Delete collection
router.delete("/collection/:id", deleteCollection);

export default router;
