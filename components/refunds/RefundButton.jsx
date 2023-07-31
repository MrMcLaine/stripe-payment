import React from 'react';
import Button from '@/components/button/Button';
import styles from '@/components/refunds/RefundButton.module.scss';

const RefundButton = ({ onClick }) => {
    return (
        <div className={styles.container}>
            <Button onClick={onClick}>
                <h3>Request Refund</h3>
            </Button>
        </div>
    );
};

export default RefundButton;
