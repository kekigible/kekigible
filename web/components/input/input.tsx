
import styles from "./input.module.scss"

const Input = ({type, id, label}:formInputProp) =>{
    return (
        <div className={styles.inputContainer}>
            <input type={type} id={id} className={styles.input} autoComplete="off" placeholder=""/>
            <label htmlFor={id} className={styles.label}>{label}</label>
        </div>
    )
}

export default Input;