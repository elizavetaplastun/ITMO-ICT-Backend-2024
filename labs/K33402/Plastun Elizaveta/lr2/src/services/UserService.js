"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
class UserService {
    static async createUser(name, email, password) {
        return User_1.User.create({ name, email, password });
    }
    static async getUserById(id) {
        return User_1.User.findByPk(id);
    }
    static async deleteUser(id) {
        const deletedCount = await User_1.User.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
exports.UserService = UserService;
