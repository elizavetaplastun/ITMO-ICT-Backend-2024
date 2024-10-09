"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const ProfileService_1 = require("../services/ProfileService");
const UserService_1 = require("../services/UserService");
class ProfileController {
    static async createOrUpdateProfile(req, res) {
        const userId = parseInt(req.params.userId);
        const { location, bio } = req.body;
        try {
            const user = await UserService_1.UserService.getUserById(userId);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }
            const profileData = await ProfileService_1.ProfileService.createOrUpdateProfile(userId, location, bio);
            res.status(201).json(profileData.profile);
        }
        catch (error) {
            console.error("Error creating or updating profile:", error);
            res.status(500).send("Error creating or updating profile");
        }
    }
    static async getProfileByUserId(req, res) {
        const userId = parseInt(req.params.userId);
        try {
            const profileData = await ProfileService_1.ProfileService.getProfileByUserId(userId);
            if (!profileData) {
                res.status(404).send("Profile not found");
                return;
            }
            res.status(200).json(profileData.profile);
        }
        catch (error) {
            console.error("Error getting profile:", error);
            res.status(500).send("Error getting profile");
        }
    }
}
exports.ProfileController = ProfileController;
