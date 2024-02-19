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
exports.userSchema = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const Schema = mongoose_1.default.Schema;
exports.userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required."],
        minlength: [3, "First Name should of minimum 3 characters."],
        maxlength: [12, "First Name can be of maximum 12 characters only."],
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
}, { timestamps: true });
// Register static method
exports.userSchema.statics.register = function (firstName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if all fields are provided
        if (!firstName || !email || !password) {
            throw Error("All fields must be provided.");
        }
        // check if first name length is more than 3 characters
        if (firstName.length < 3) {
            throw Error("First name should be of at least 3 characters.");
        }
        // check if email is valid
        if (!validator_1.default.isEmail(email)) {
            throw Error("Please enter a valid email address.");
        }
        // check if password is strong
        if (!validator_1.default.isStrongPassword) {
            throw Error("Please provide a strong password.");
        }
        // check if email already exists
        const account = yield this.findOne({ email });
        // Throw an error if the email already exists
        if (account) {
            throw Error("Email already registered.");
        }
        // generate hashed password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield this.create({ firstName, email, password: hash });
        return user;
    });
};
// Login static method
exports.userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if all fields are provided
        if (!email || !password) {
            throw Error("All fields must be provided.");
        }
        // check if email already exists
        const user = yield this.findOne({ email });
        // Throw an error if the email does not exists
        if (!user) {
            throw Error("This email is not registered.");
        }
        // compare password
        const comparedPassword = yield bcrypt_1.default.compare(password, user.password);
        // check if password is correct
        if (!comparedPassword) {
            throw Error("Incorrect password.");
        }
        return user;
    });
};
exports.default = mongoose_1.default.model("User", exports.userSchema);
