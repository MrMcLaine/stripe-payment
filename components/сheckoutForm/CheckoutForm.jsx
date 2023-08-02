import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Button from '@/components/button/Button';
import InputField from '@/components/inputField/InputField';
import styles from './CheckoutForm.module.scss';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

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
                const response = await axios.post(
                    '/transaction/create-payment-intent',
                    {
                        user: user,
                        paymentMethodId: paymentMethod.id,
                        amount: amount * 100,
                    }
                );
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <InputField
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                label="Amount"
            />
            <CardElement className={styles.cardElement} />
            <Button type="submit" disabled={!stripe}>
                <h3>Pay</h3>
            </Button>
        </form>
    );
};

export default CheckoutForm;
