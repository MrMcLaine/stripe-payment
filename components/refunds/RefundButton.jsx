import React, { useState } from 'react';
import Button from '@/components/button/Button';
import InputField from '@/components/inputField/InputField';
import axios from 'axios';
import styles from '@/components/refunds/RefundButton.module.scss';

const RefundButton = () => {
    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [error, setError] = useState(null);

    const onClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                '/transaction/createRefund',
                {
                    paymentIntentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert(
                    'Refund successfully created! Transaction ID: ' +
                        response.data.transactionId
                );
            } else {
                alert('Failed to create refund: ' + response.data.error);
            }
        } catch (error) {
            console.error('Failed to create refund:', error);
        }
    };

    const onInputChange = e => {
        const value = e.target.value;
        if (/^pi_[a-zA-Z0-9]+$/.test(value) || value === '') {
            setError(null);
            setPaymentIntentId(value);
        } else {
            setError(
                'Invalid Payment Intent ID format. It should start with "pi_" followed by alphanumeric characters'
            );
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <InputField
                type="text"
                value={paymentIntentId}
                onChange={onInputChange}
                label="Payment Intent ID"
            />
            <Button onClick={onClick}>
                <h3>Request Refund</h3>
            </Button>
        </div>
    );
};

export default RefundButton;
