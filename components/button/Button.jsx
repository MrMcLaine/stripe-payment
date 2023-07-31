import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, onClick, disabled = false }) => {
    return (
        <button onClick={onClick} className={styles.button} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;