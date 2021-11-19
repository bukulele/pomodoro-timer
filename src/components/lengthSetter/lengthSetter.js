import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import styles from "./lengthSetter.module.css";

function LengthSetter({ content, counter, manageSessionLength, timerIsRun }) {
  const clickHandler = (event) => {
    if (!timerIsRun) manageSessionLength(event.target.id, content);
  };
  return (
    <div className={styles.lengthBlock}>
      <p id={`${content}-label`} className={styles.text}>
        {`${content} length`}
      </p>
      <div className={styles.lengthSetter}>
        <Button id={`${content}-increment`} clickHandler={clickHandler}>
          <FontAwesomeIcon icon={faChevronUp} pointerEvents="none" />
        </Button>
        <div id={`${content}-length`} className={styles.contentLength}>
          {counter}
        </div>
        <Button id={`${content}-decrement`} clickHandler={clickHandler}>
          <FontAwesomeIcon icon={faChevronDown} pointerEvents="none" />
        </Button>
      </div>
    </div>
  );
}

export default LengthSetter;
