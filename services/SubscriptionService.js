const Subscription = require('../models/Subscription');

const subscriptionService = {
    createSubscription: async (
        userId,
        stripeSubscriptionId,
        name,
        price,
        status
    ) => {
        try {

            return await Subscription.create({
                userId,
                stripeSubscriptionId,
                name,
                price,
                status,
            });
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create a subscription');
        }
    },

    updateSubscriptionStatus: async (subscriptionId, newStatus) => {
        try {

            return await Subscription.updateOne(
                { stripeSubscriptionId: subscriptionId },
                { $set: { status: newStatus } }
            );
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update subscription status');
        }
    },
};

module.exports = subscriptionService;
