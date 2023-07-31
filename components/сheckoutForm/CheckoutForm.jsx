import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
            <button type="submit" disabled={!stripe} className={styles.button}>
                <h3>Pay</h3>
            </button>
        </form>
    );
};

export default CheckoutForm;
