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
exports.registerUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
// Create JWT token
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, validateEnv_1.default.JWT_SECRET_KEY, { expiresIn: "30 days" });
};
// login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_1.default.login(email, password);
        const token = yield createToken(user._id);
        res
            .status(200)
            .json({ userId: user._id, firstName: user.firstName, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
// register
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, email, password } = req.body;
    try {
        const user = yield users_1.default.register(firstName, email, password);
        const token = yield createToken(user._id);
        res
            .status(200)
            .json({ userId: user._id, firstName: user.firstName, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerUser = registerUser;
