import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../сheckoutForm/CheckoutForm';
import RefundButton from '@/components/refunds/RefundButton';
import styles from './PaymentForm.module.scss';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
    const handleRefund = async () => {
        console.log('Refund requested');
    };
    return (
        <div className={styles.container}>
            <Elements stripe={stripePromise}>
                <h3>Payment Form</h3>
                <CheckoutForm />
                <RefundButton onClick={handleRefund} />
            </Elements>
        </div>
    );
};

export default PaymentForm;
