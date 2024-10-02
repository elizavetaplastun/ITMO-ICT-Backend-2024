"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const token = await AuthService_1.AuthService.registerUser(name, email, password);
            res.status(201).json({ token });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await AuthService_1.AuthService.loginUser(email, password);
            res.status(200).json({ token });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            }
            else {
                res.status(401).json({ error: "An unknown error occurred" });
            }
        }
    }
}
exports.AuthController = AuthController;
