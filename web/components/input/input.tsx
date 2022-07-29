import styles from "./input.module.scss";

const defaultProp: formInputProp = {
  type: "text",
  label: "Text",
  id: "text",
  required: false,
};

const Input = ({ type, id, label, required, name }: formInputProp) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={id}
        className={styles.input}
        autoComplete="off"
        placeholder=""
        required={required}
        name={name}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

Input.defaultProps = defaultProp;

export default Input;
