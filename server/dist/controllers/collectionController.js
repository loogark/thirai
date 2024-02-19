"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollection = exports.addCollection = exports.allCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collection_1 = __importDefault(require("../models/collection"));
// All collection
const allCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    try {
        const collection = yield collection_1.default.find({ userId: id }).sort({
            createdAt: -1,
        });
        res.status(200).json({ collection });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.allCollection = allCollection;
// Add collection
const addCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mediaId, original_title, media_type, saveType, userId, imagePath, poster_path, vote_average, vote_count, profile_path, } = req.body;
    try {
        const singleItem = yield collection_1.default.create({
            mediaId,
            original_title,
            media_type,
            saveType,
            userId,
            imagePath,
            poster_path,
            vote_average,
            vote_count,
            profile_path,
        });
        res.status(200).json({ singleItem });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addCollection = addCollection;
// Delete collection
const deleteCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // check if id is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid collection." });
    }
    try {
        const singleItem = yield collection_1.default.findOneAndDelete({ _id: id });
        res.status(200).json({ singleItem });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteCollection = deleteCollection;
