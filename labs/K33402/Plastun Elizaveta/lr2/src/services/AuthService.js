"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = __importDefault(require("process"));
class AuthService {
    static async registerUser(name, email, password) {
        try {
            const existingUser = await User_1.User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error("User with this email already exists");
            }
            const newUser = await User_1.User.create({
                name,
                email,
                password,
            });
            const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, process_1.default.env.JWT_SECRET_KEY, {
                expiresIn: "1h",
            });
            return token;
        }
        catch (error) {
            console.error("Error registering user:", error);
            throw new Error("Error registering user");
        }
    }
    static async loginUser(email, password) {
        try {
            const user = await User_1.User.findOne({ where: { email } });
            if (!user) {
                throw new Error("Invalid email");
            }
            const passwordMatch = await user.checkPassword(password);
            console.log("passwordMatch:", passwordMatch);
            if (!passwordMatch) {
                throw new Error("Invalid password");
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process_1.default.env.JWT_SECRET_KEY, {
                expiresIn: "1h",
            });
            return token;
        }
        catch (error) {
            console.error("Error logging in:", error);
            throw new Error("Error logging in");
        }
    }
}
exports.AuthService = AuthService;
