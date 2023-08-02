import React, { useState } from 'react';
import PaymentForm from '../components/PaymentForm/PaymentForm';
import UserManager from '@/components/userManager/UserManager';
import styles from '../styles/Main.module.scss';
import CheckoutForm from '@/components/сheckoutForm/CheckoutForm';
import RefundButton from '@/components/refunds/RefundButton';

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    return (
        <div className={styles.container}>
            <h1>Welcome to Our Payment App</h1>
            <UserManager user={user} setUser={setUser} setError={setError} />
            <PaymentForm formTitle="Payment Form">
                <CheckoutForm />
                <RefundButton />
            </PaymentForm>

        </div>
    );
}
