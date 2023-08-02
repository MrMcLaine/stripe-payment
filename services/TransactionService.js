const Transaction = require('../models/Transaction');

const transactionService = {
    createPaymentIntent: async (
        user,
        paymentIntentId,
        paymentMethodId,
        amount,
        status,
        type
    ) => {
        try {

            return await Transaction.create({
                user,
                paymentIntentId,
                paymentMethodId,
                amount,
                status,
                type,
            });
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create a transaction');
        }
    },

    createRefund: async (
        user,
        paymentIntentId,
        paymentMethodId,
        amount,
        status,
        type
    ) => {
        try {

            return await Transaction.create({
                user,
                paymentIntentId,
                paymentMethodId,
                amount,
                status,
                type,
            });
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create a transaction');
        }
    },
};

module.exports = transactionService;
