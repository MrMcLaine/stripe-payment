const express = require('express');
const router = express.Router();
const transactionService = require('../services/TransactionService');

router.post('/create-payment-intent', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const { amount, user } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: 'pm_card_visa',
        });

        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
            paymentIntent.id
        );

        const transaction = await transactionService.createPaymentIntent(
            user._id,
            confirmedPaymentIntent.id,
            confirmedPaymentIntent.payment_method,
            confirmedPaymentIntent.amount,
            confirmedPaymentIntent.status,
            'charge'
        );

        res.json({
            status: 'success',
            message: 'Payment Intent successfully created',
            ...{
                clientSecret: paymentIntent.client_secret,
                transactionId: transaction._id,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'An error occurred, unable to create payment intent',
            error: error.message,
        });
    }
});

router.post('/createRefund', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const { paymentIntentId } = req.body;
        const user = req.user;

        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
        });

        const transaction = await transactionService.createRefund({
            user: user._id,
            paymentIntentId: paymentIntentId,
            paymentMethodId: '',
            amount: refund.amount,
            status: 'succeeded',
            type: 'refund',
        });

        res.json({
            status: 'success',
            message: 'Payment Intent successfully created',
            ...{
                refundId: refund.id,
                transactionId: transaction._id,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'An error occurred, unable to create refund',
            error: error.message,
        });
    }
});

module.exports = router;
