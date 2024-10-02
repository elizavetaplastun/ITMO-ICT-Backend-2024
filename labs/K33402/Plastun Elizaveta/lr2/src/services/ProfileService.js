"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const Profile_1 = require("../models/Profile");
const User_1 = require("../models/User");
class ProfileService {
    static async createOrUpdateProfile(userId, location, bio) {
        try {
            let profile = await Profile_1.Profile.findOne({ where: { userId } });
            if (!profile) {
                profile = await Profile_1.Profile.create({ userId, location, bio });
            }
            else {
                profile.location = location;
                profile.bio = bio;
                await profile.save();
            }
            const user = await User_1.User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return {
                profile: {
                    id: profile.id,
                    userId: profile.userId,
                    location: profile.location,
                    bio: profile.bio,
                },
                userName: user.name,
                userEmail: user.email
            };
        }
        catch (error) {
            throw new Error('Error creating or updating profile: ' + error.message);
        }
    }
    static async getProfileByUserId(userId) {
        const user = await User_1.User.findByPk(userId);
        if (!user) {
            return null;
        }
        const profile = await Profile_1.Profile.findOne({ where: { userId } });
        if (!profile) {
            return null;
        }
        return {
            profile: {
                id: profile.id,
                userId: profile.userId,
                location: profile.location,
                bio: profile.bio,
            },
            userName: user.name,
            userEmail: user.email
        };
    }
}
exports.ProfileService = ProfileService;
