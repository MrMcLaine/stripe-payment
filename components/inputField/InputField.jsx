import styles from './InputField.module.scss';

const InputField = ({ type, value, onChange, label, checked }) => (
    <>
        <div className={styles.inputField}>
            <label>{label}: </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                checked={checked}
                required
            />
        </div>
    </>
);

export default InputField;
