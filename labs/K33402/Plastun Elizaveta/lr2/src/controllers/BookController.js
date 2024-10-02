"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const BookService_1 = require("../services/BookService");
class BookController {
    static async createBook(req, res) {
        const { title, author } = req.body;
        try {
            await BookService_1.BookService.createBook(title, author);
            res.status(201).send("Book created successfully");
        }
        catch (error) {
            console.error("Error creating book:", error);
            res.status(500).send("Error creating book");
        }
    }
    static async getAllBooks(req, res) {
        try {
            const books = await BookService_1.BookService.getAllBooks();
            res.json(books);
        }
        catch (error) {
            console.error("Error fetching books:", error);
            res.status(500).send("Error fetching books");
        }
    }
}
exports.BookController = BookController;
