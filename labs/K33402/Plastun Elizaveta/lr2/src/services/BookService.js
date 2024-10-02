"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const Book_1 = require("../models/Book");
class BookService {
    static async createBook(title, author) {
        try {
            const book = await Book_1.Book.create({ title, author });
            console.log('Book created:', book.toJSON());
        }
        catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    }
    static async getAllBooks() {
        try {
            const books = await Book_1.Book.findAll();
            return books;
        }
        catch (error) {
            console.error('Error fetching books:', error);
            throw new Error('Error fetching books');
        }
    }
    static async addBook(title, author) {
        const book = await Book_1.Book.create({ title, author });
        return book;
    }
    static async deleteBook(id) {
        const deletedCount = await Book_1.Book.destroy({ where: { id } });
        return deletedCount > 0;
    }
    static async getBookById(id) {
        try {
            const book = await Book_1.Book.findByPk(id);
            return book;
        }
        catch (error) {
            console.error('Error fetching book by id:', error);
            throw new Error('Error fetching book by id');
        }
    }
}
exports.BookService = BookService;
