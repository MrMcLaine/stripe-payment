const plans = [
    {
        id: 'basic',
        amount: 100,
        currency: 'usd',
        interval: 'month',
        product: {
            name: 'Basic Plan',
        },
    },
    {
        id: 'standard',
        amount: 200,
        currency: 'usd',
        interval: 'month',
        product: {
            name: 'Standard Plan',
        },
    },
    {
        id: 'premium',
        amount: 300,
        currency: 'usd',
        interval: 'month',
        product: {
            name: 'Premium Plan',
        },
    },
];

async function createPlans() {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    console.log('Stripe Secret Key: ', process.env.STRIPE_SECRET_KEY);
    for (let plan of plans) {
        try {
            console.log('Start creating plan: ');
            console.log()
            const stripePlan = await stripe.plans.create(plan);
            console.log(`Plan ${plan.id} created with ID ${stripePlan.id}`);
        } catch (err) {
            if (err.code === 'resource_already_exists') {
                console.log(`Plan ${plan.id} already exists, skipping`);
            } else {
                console.error(`Failed to create plan ${plan.id}: ${err.message}`);
            }
        }
    }
}

module.exports = createPlans;
