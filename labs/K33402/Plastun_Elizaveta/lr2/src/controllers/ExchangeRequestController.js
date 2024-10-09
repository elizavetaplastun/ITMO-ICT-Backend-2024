"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRequestController = void 0;
const ExchangeRequestRepository_1 = require("../repositories/ExchangeRequestRepository");
class ExchangeRequestController {
    static async createExchangeRequest(req, res) {
        const { userId, exchangeWithUserId, bookId, bookTitle } = req.body;
        try {
            await ExchangeRequestRepository_1.ExchangeRequestRepository.createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle);
            res.status(201).send('Exchange request created successfully');
        }
        catch (error) {
            console.error('Error creating exchange request:', error);
            res.status(500).send('Error creating exchange request');
        }
    }
    static async deleteExchangeRequest(req, res) {
        const requestId = parseInt(req.params.id);
        try {
            const success = await ExchangeRequestRepository_1.ExchangeRequestRepository.deleteExchangeRequest(requestId);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).send('Exchange request not found');
            }
        }
        catch (error) {
            console.error('Error deleting exchange request:', error);
            res.status(500).send('Error deleting exchange request');
        }
    }
    static async getUserExchangeRequests(req, res) {
        const userId = parseInt(req.params.userId);
        try {
            const exchangeRequests = await ExchangeRequestRepository_1.ExchangeRequestRepository.getUserExchangeRequests(userId);
            res.json(exchangeRequests);
        }
        catch (error) {
            console.error('Error fetching exchange requests:', error);
            res.status(500).send('Error fetching exchange requests');
        }
    }
    static async confirmExchangeRequest(req, res) {
        const requestId = parseInt(req.params.id);
        try {
            const success = await ExchangeRequestRepository_1.ExchangeRequestRepository.confirmExchangeRequest(requestId);
            if (success) {
                res.status(200).send('Exchange request confirmed successfully');
            }
            else {
                res.status(404).send('Exchange request not found');
            }
        }
        catch (error) {
            console.error('Error confirming exchange request:', error);
            res.status(500).send('Error confirming exchange request');
        }
    }
}
exports.ExchangeRequestController = ExchangeRequestController;
