    const express = require('express');
    const router = express.Router();
    const userService = require('../services/UserService');
    const TransactionService = require('../services/TransactionService');
    const SubscriptionService = require('../services/SubscriptionService');

    router.post('/create', async (req, res) => {
        try {
            const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
            const { plan, price, paymentMethodId } = req.body;

            const userDetails = await userService.getUserById(req.user.id);

            console.log('userDetails', userDetails);

            if (!userDetails || !userDetails.stripeCustomerId) {
                console.log('User not found');
                res.status(500).json({
                    status: 'error',
                    message:
                        'An error occurred, no valid Stripe customer associated with this user',
                });

                return;
            }

            await stripe.paymentMethods.attach(paymentMethodId, {
                customer: userDetails.stripeCustomerId,
            });

            await stripe.customers.update(userDetails.stripeCustomerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });

            const subscription = await stripe.subscriptions.create({
                customer: userDetails.stripeCustomerId,
                items: [{ plan }],
                expand: ['latest_invoice.payment_intent'],
            });

            await userService.updateUser(userDetails._id, {
                stripeCustomerId: userDetails.stripeCustomerId,
                subscriptionId: subscription.id,
            });

            const transaction = await TransactionService.createPaymentIntent(
                userDetails._id,
                subscription.latest_invoice.payment_intent.id,
                paymentMethodId,
                price,
                subscription.latest_invoice.payment_intent.status,
                'subscription'
            );

            await SubscriptionService.createSubscription(
                userDetails._id,
                subscription.id,
                plan,
                price,
                subscription.status
            );

            res.json({
                status: 'success',
                message: 'Subscription successfully created',
                subscription,
                transactionId: transaction._id,
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: 'An error occurred, unable to create subscription',
                error: error.message,
            });
        }
    });

    module.exports = router;
