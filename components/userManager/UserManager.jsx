import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '@/components/loginForm/LoginForm';
import RegisterForm from '@/components/registerForm/RegisterForm';
import Button from '@/components/Button/Button';
import styles from './UserManager.module.scss';

export default function UserManager({ setUser, setError }) {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const handleLogin = async credentials => {
        try {
            const res = await axios.post('/api/login', credentials);
            setUser(res.data.user);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to log in');
        }
    };

    const handleRegister = async data => {
        try {
            const res = await axios.post('/api/register', data);
            setUser(res.data.user);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to register');
        }
    };

    return (
        <>
            <div className={styles.container}>
                {isLoginFormVisible ? (
                    <LoginForm onLogin={handleLogin} />
                ) : (
                    <RegisterForm onRegister={handleRegister} />
                )}
                <Button
                    onClick={() => setLoginFormVisible(!isLoginFormVisible)}
                >
                    {isLoginFormVisible
                        ? 'Switch to Register'
                        : 'Switch to Login'}
                </Button>
            </div>
        </>
    );
}
