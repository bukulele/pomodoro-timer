import styles from "./timer.module.css";

function Timer({ displayTimer, isItSession }) {
  return (
    <div className={styles.timer}>
      <h2 id="timer-label" className={styles.timerLabel}>
        {isItSession ? "Session" : "Break"}
      </h2>
      <div id="time-left" className={styles.timeLeft}>
        {displayTimer}
      </div>
    </div>
  );
}

export default Timer;
