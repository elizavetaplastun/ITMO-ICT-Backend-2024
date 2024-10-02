"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBookController = void 0;
const UserBookService_1 = require("../services/UserBookService");
const BookService_1 = require("../services/BookService");
class UserBookController {
    static async addUserBook(req, res) {
        const userId = parseInt(req.params.userId);
        const bookId = req.body.bookId;
        try {
            const userBook = await UserBookService_1.UserBookService.addUserBook(userId, bookId);
            res.status(201).json(userBook);
        }
        catch (error) {
            console.error('Error adding user book:', error);
            res.status(500).send('Error adding user book');
        }
    }
    static async deleteUserBook(req, res) {
        const userBookId = parseInt(req.params.id);
        try {
            const success = await UserBookService_1.UserBookService.deleteUserBook(userBookId);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).send('User book not found');
            }
        }
        catch (error) {
            console.error('Error deleting user book:', error);
            res.status(500).send('Error deleting user book');
        }
    }
    static async getUserBooks(req, res) {
        const userId = parseInt(req.params.userId);
        try {
            const userBooks = await UserBookService_1.UserBookService.getUserBooks(userId);
            const booksWithDetails = await Promise.all(userBooks.map(async (userBook) => {
                const bookId = userBook.bookId;
                const book = await BookService_1.BookService.getBookById(bookId);
                if (book) {
                    return {
                        id: userBook.id,
                        title: book.title,
                        author: book.author
                    };
                }
                else {
                    return null;
                }
            }));
            const filteredBooks = booksWithDetails.filter(book => book !== null);
            res.json(filteredBooks);
        }
        catch (error) {
            console.error('Error getting user books:', error);
            res.status(500).send('Error getting user books');
        }
    }
}
exports.UserBookController = UserBookController;
