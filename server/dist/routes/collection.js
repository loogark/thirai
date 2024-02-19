"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collectionController_1 = require("../controllers/collectionController");
const router = express_1.default.Router();
// Get all collection
router.get("/collection", collectionController_1.allCollection);
// Add collection
router.post("/collection", collectionController_1.addCollection);
// Delete collection
router.delete("/collection/:id", collectionController_1.deleteCollection);
exports.default = router;
