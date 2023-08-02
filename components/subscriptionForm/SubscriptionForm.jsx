import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import InputField from '@/components/inputField/InputField';
import Button from '@/components/button/Button';
import styles from './SubscriptionForm.module.scss';

const SubscriptionForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const subscriptionOptions = {
        basic: 100,
        standard: 200,
        premium: 300,
    };

    const [subscriptionPlan, setSubscriptionPlan] = useState('basic');
    const price = subscriptionOptions[subscriptionPlan];

    const handleSubscription = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);

            try {
                const response = await axios.post('/subscriptions/create', {
                    plan: subscriptionPlan,
                    price: price * 100,
                    paymentMethodId: paymentMethod.id,
                });
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <form onSubmit={handleSubscription} className={styles.form}>
            <InputField
                type="radio"
                value="basic"
                checked={subscriptionPlan === 'basic'}
                onChange={() => setSubscriptionPlan('basic')}
                label="Basic Plan ($1.00)"
            />
            <InputField
                type="radio"
                value="standard"
                checked={subscriptionPlan === 'standard'}
                onChange={() => setSubscriptionPlan('standard')}
                label="Standard Plan ($2.00)"
            />
            <InputField
                type="radio"
                value="premium"
                checked={subscriptionPlan === 'premium'}
                onChange={() => setSubscriptionPlan('premium')}
                label="Premium Plan ($3.00)"
            />

            <CardElement className={styles.cardElement} />
            <Button disabled={!stripe}>Subscribe</Button>
        </form>
    );
};

export default SubscriptionForm;
