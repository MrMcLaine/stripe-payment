import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '@/components/button/Button';
import styles from './CheckoutForm.module.scss';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
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
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <CardElement className={styles.cardElement} />
            <Button type="submit" disabled={!stripe}>
                <h3>Pay</h3>
            </Button>
        </form>
    );
};

export default CheckoutForm;
