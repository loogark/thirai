"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.userCollection = new Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Collection", exports.userCollection);
