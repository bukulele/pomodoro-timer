import styles from "./button.module.css";

function Button({ id, children, clickHandler }) {
  return (
    <button id={id} className={styles.button} onClick={clickHandler}>
      {children}
    </button>
  );
}

export default Button;
