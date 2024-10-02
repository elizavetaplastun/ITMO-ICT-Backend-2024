"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRequestService = void 0;
const ExchangeRequestRepository_1 = require("../repositories/ExchangeRequestRepository");
class ExchangeRequestService {
    static async createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle) {
        try {
            await ExchangeRequestRepository_1.ExchangeRequestRepository.createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle);
        }
        catch (error) {
            throw new Error('Error creating exchange request');
        }
    }
    static async deleteExchangeRequest(requestId) {
        try {
            return await ExchangeRequestRepository_1.ExchangeRequestRepository.deleteExchangeRequest(requestId);
        }
        catch (error) {
            throw new Error('Error deleting exchange request');
        }
    }
    static async getUserExchangeRequests(userId) {
        try {
            return await ExchangeRequestRepository_1.ExchangeRequestRepository.getUserExchangeRequests(userId);
        }
        catch (error) {
            throw new Error('Error fetching exchange requests');
        }
    }
    static async confirmExchangeRequest(requestId) {
        try {
            return await ExchangeRequestRepository_1.ExchangeRequestRepository.confirmExchangeRequest(requestId);
        }
        catch (error) {
            throw new Error('Error confirming exchange request');
        }
    }
}
exports.ExchangeRequestService = ExchangeRequestService;
