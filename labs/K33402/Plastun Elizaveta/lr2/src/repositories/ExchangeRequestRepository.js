"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRequestRepository = void 0;
const ExchangeRequest_1 = require("../models/ExchangeRequest");
class ExchangeRequestRepository {
    static async createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle) {
        try {
            await ExchangeRequest_1.ExchangeRequest.create({ userId, exchangeWithUserId, bookId, bookTitle });
        }
        catch (error) {
            throw new Error('Ошибка при создании запроса на обмен');
        }
    }
    static async deleteExchangeRequest(requestId) {
        try {
            const deletedCount = await ExchangeRequest_1.ExchangeRequest.destroy({ where: { id: requestId } });
            return deletedCount > 0;
        }
        catch (error) {
            throw new Error('Ошибка при удалении запроса на обмен');
        }
    }
    static async getUserExchangeRequests(userId) {
        try {
            const exchangeRequests = await ExchangeRequest_1.ExchangeRequest.findAll({ where: { userId } });
            return exchangeRequests;
        }
        catch (error) {
            throw new Error('Ошибка при получении запросов на обмен');
        }
    }
    static async confirmExchangeRequest(requestId) {
        try {
            const [updatedCount] = await ExchangeRequest_1.ExchangeRequest.update({ status: 'confirmed' }, { where: { id: requestId } });
            return updatedCount > 0;
        }
        catch (error) {
            throw new Error('Ошибка при подтверждении запроса на обмен');
        }
    }
}
exports.ExchangeRequestRepository = ExchangeRequestRepository;
