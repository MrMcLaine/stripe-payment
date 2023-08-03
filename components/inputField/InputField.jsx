import styles from './InputField.module.scss';

const InputField = ({ type, value, onChange, label, checked, width }) => (
    <>
        <div className={styles.inputField} style={{ width: `${width}px` }}>
            <div style={{ width: `${width/5}px` }}>
                <label>{label}: </label>
            </div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                checked={checked}
                required
                style={{ width: `${4*width/5}px` }}
            />
        </div>
    </>
);

export default InputField;
