const mongoose = require('mongoose');

const Transaction = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        paymentIntentId: {
            type: String,
            required: true,
        },
        paymentMethodId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['succeeded', 'pending', 'failed', 'refunded'],
            default: 'pending',
        },
        type: {
            type: String,
            required: true,
            enum: ['charge', 'refund'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Transaction', Transaction);
