import React, { useState } from 'react';
import PaymentForm from '../components/PaymentForm/PaymentForm';
import UserManager from '@/components/userManager/UserManager';
import styles from '../styles/Main.module.scss';

export default function HomePage() {
    const [setUser] = useState(null);
    const [setError] = useState(null);

    return (
        <div className={styles.container}>
            <h1>Welcome to Our Payment App</h1>
            <UserManager setUser={setUser} setError={setError} />
            <PaymentForm />
        </div>
    );
}
