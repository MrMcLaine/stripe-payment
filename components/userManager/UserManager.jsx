import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '@/components/loginForm/LoginForm';
import RegisterForm from '@/components/registerForm/RegisterForm';
import Button from '@/components/button/Button';
import styles from './UserManager.module.scss';

export default function UserManager({ user, setUser, setError }) {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const handleLogin = async credentials => {
        try {
            const res = await axios.post('/user/login', credentials);
            setUser(res.data.user);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.response.data.message);
        }
    };

    const handleRegister = async data => {
        try {
            const res = await axios.post('/user/', data);
            setUser(res.data.user);
            setError(null);
            setLoginFormVisible(true);
        } catch (err) {
            console.error(err);
            setError(err.response.data.message);
        }
    };

    return (
        <>
            {user && <h2>Welcome, {user.name}!</h2>} {/* Display greeting if user exists */}
            <div className={styles.container}>
                {!user && (
                    <>
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
                    </>
                )}
            </div>
        </>
    );
}
