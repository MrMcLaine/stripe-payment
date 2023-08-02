import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styles from './PaymentForm.module.scss';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ children, formTitle }) => {
    return (
        <div className={styles.container}>
            <Elements stripe={stripePromise}>
                <h3>{formTitle}</h3>
                {children}
            </Elements>
        </div>
    );
};

export default PaymentForm;
