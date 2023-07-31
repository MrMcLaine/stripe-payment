import PaymentForm from '../components/PaymentForm/PaymentForm';
import styles from '../styles/Main.module.scss';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <h1>Welcome to Our Payment App</h1>
            <PaymentForm />
        </div>
    );
}
