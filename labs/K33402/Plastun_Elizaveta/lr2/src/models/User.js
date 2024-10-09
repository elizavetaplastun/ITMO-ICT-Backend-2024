"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt_1.default.hash(this.password, 10);
        }
    }
    async checkPassword(password) {
        return await bcrypt_1.default.compare(password, this.password);
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "User",
    hooks: {
        beforeCreate: async (user) => {
            await user.hashPassword();
        },
        beforeUpdate: async (user) => {
            if (user.changed("password")) {
                await user.hashPassword();
            }
        },
    },
});
