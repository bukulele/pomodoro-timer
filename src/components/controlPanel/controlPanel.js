import React from "react";
import Button from "../button/button";
import styles from "./controlPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

function ControlPanel({ startStop, reset }) {
  return (
    <div className={styles.controlPanel}>
      <Button id="start_stop" clickHandler={startStop}>
        <FontAwesomeIcon icon={faPlay} pointerEvents="none" />
        <span> / </span>
        <FontAwesomeIcon icon={faPause} pointerEvents="none" />
      </Button>
      <Button id="reset" clickHandler={reset}>
        <FontAwesomeIcon icon={faSyncAlt} pointerEvents="none" />
      </Button>
    </div>
  );
}

export default ControlPanel;
