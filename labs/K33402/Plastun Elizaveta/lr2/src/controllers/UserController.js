"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const ProfileService_1 = require("../services/ProfileService");
class UserController {
    static async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await UserService_1.UserService.createUser(name, email, password);
            await ProfileService_1.ProfileService.createOrUpdateProfile(user.id, '', '');
            res.status(201).json(user);
        }
        catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
        }
    }
    static async getUserById(req, res) {
        const userId = parseInt(req.params.id);
        try {
            const user = await UserService_1.UserService.getUserById(userId);
            if (!user) {
                res.status(404).send('User not found');
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error getting user by id:', error);
            res.status(500).send('Error getting user');
        }
    }
    static async deleteUser(req, res) {
        const userId = parseInt(req.params.id);
        try {
            const success = await UserService_1.UserService.deleteUser(userId);
            if (!success) {
                res.status(404).send('User not found');
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send('Error deleting user');
        }
    }
}
exports.UserController = UserController;
