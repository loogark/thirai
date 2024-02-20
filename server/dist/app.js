"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userAuthorization_1 = require("./middleware/userAuthorization");
const collection_1 = __importDefault(require("./routes/collection"));
const tmdb_1 = __importDefault(require("./routes/tmdb"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://thirai.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/api", tmdb_1.default);
// User Authorization
app.use("/authorization", user_1.default);
// authorization middleware
app.use(userAuthorization_1.userAuthorization);
app.use("/user", collection_1.default);
exports.default = app;
