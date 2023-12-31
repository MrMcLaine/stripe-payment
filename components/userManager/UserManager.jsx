import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '@/components/loginForm/LoginForm';
import RegisterForm from '@/components/registerForm/RegisterForm';
import Button from '@/components/button/Button';
import styles from './UserManager.module.scss';

export default function UserManager({ user, setUser, setError }) {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleLogin = async credentials => {
        try {
            const res = await axios.post('/user/login', credentials);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            setError(null);
            setSuccessMessage('Successfully logged in!');
            setIsFormVisible(false);
        } catch (err) {
            console.error(err);
            setError(err.response.data.message);
            setSuccessMessage(null);
        }
    };

    const handleRegister = async user => {
        try {
            const res = await axios.post('/user/', user);
            setUser(res.data.user);
            setError(null);
            setSuccessMessage('Successfully registered! Please log in.');
            setLoginFormVisible(true);
        } catch (err) {
            console.error(err);
            setError(err.response.data.message);
            setSuccessMessage(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsFormVisible(true);
        setSuccessMessage(null);
    };

    return (
        <>
            {user && (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            )}
            {/* ... */}
            <div className={styles.container}>
                {isFormVisible && (
                    <>
                        <div className={styles.formWithButton}>
                            {isLoginFormVisible ? (
                                <LoginForm onLogin={handleLogin} />
                            ) : (
                                <RegisterForm onRegister={handleRegister} />
                            )}
                            <Button
                                onClick={() =>
                                    setLoginFormVisible(!isLoginFormVisible)
                                }
                            >
                                {isLoginFormVisible
                                    ? 'Switch to Register'
                                    : 'Switch to Login'}
                            </Button>
                        </div>
                    </>
                )}
                {successMessage && <p>{successMessage}</p>}
            </div>
        </>
    );
}
