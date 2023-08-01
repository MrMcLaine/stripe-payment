import styles from './InputField.module.scss';

const InputField = ({ type, value, onChange, label }) => (
    <>
        <div className={styles.inputField}>
            <label>{label}: </label>
            <input type={type} value={value} onChange={onChange} required />
        </div>
    </>
);

export default InputField;
