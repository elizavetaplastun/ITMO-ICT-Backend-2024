"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.deleteUser = exports.getUserById = exports.createUser = void 0;
const User_1 = require("../models/User");
const createUser = async (name, email, password) => {
    const user = await User_1.User.create({ name, email, password });
    return user;
};
exports.createUser = createUser;
const getUserByEmail = async (email) => {
    const user = await User_1.User.findOne({ where: { email } });
    return user;
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (id) => {
    try {
        const user = await User_1.User.findByPk(id);
        return user;
    }
    catch (error) {
        throw new Error('Error getting user by id: ' + error.message);
    }
};
exports.getUserById = getUserById;
const deleteUser = async (id) => {
    try {
        const deletedCount = await User_1.User.destroy({ where: { id } });
        return deletedCount > 0;
    }
    catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};
exports.deleteUser = deleteUser;
