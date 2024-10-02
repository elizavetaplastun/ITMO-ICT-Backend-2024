"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBookService = void 0;
const UserBook_1 = require("../models/UserBook");
const Book_1 = require("../models/Book");
class UserBookService {
    static async addUserBook(userId, bookId) {
        const userBook = await UserBook_1.UserBook.create({ userId, bookId });
        return userBook;
    }
    static async deleteUserBook(userBookId) {
        const deletedCount = await UserBook_1.UserBook.destroy({ where: { id: userBookId } });
        return deletedCount > 0;
    }
    static async getUserBooks(userId) {
        try {
            const userBooks = await UserBook_1.UserBook.findAll({
                where: { userId },
                include: [{ model: Book_1.Book, as: 'book' }]
            });
            return userBooks;
        }
        catch (error) {
            throw new Error('Error getting user books: ' + error.message);
        }
    }
}
exports.UserBookService = UserBookService;
