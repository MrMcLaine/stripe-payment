import React, { useState } from 'react';
import InputField from '@/components/inputField/InputField';
import Button from '@/components/button/Button';
import styles from './LoginForm.module.scss';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        onLogin({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <InputField
                width={400}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email"
            />
            <InputField
                width={400}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                label="Password"
            />
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginForm;
