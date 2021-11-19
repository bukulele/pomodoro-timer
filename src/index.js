import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import ControlPanel from "./components/controlPanel/controlPanel";
import LengthSetter from "./components/lengthSetter/lengthSetter";
import Timer from "./components/timer/timer";
import "./index.css";
import metalGearBeep from "./sounds/beep.mp3";

function App() {
  const [displayTimer, setDislplayTimer] = useState("25:00");
  const [timerId, setTimerId] = useState(null);
  const [timerIsRun, setTimerIsRun] = useState(false);
  const [isItSession, setIsItSession] = useState(true);
  const [currentTimer, setCurrentTimer] = useState(25 * 60);
  const [sessionTimer, setSessionTimer] = useState(25 * 60);
  const [breakTimer, setBreakTimer] = useState(5 * 60);

  const audioRef = useRef();

  // let i = 1;

  const manageSessionLength = (id, content) => {
    if (content === "session") {
      setSessionTimer(() => {
        if (id.includes("increment")) {
          if (sessionTimer <= 60 * 59) {
            return sessionTimer + 60;
          } else {
            return sessionTimer;
          }
        } else {
          if (sessionTimer >= 60 * 2) {
            return sessionTimer - 60;
          } else {
            return sessionTimer;
          }
        }
      });
    } else {
      setBreakTimer(() => {
        if (id.includes("increment")) {
          if (breakTimer <= 60 * 59) {
            return breakTimer + 60;
          } else {
            return breakTimer;
          }
        } else {
          if (breakTimer >= 60 * 2) {
            return breakTimer - 60;
          } else {
            return breakTimer;
          }
        }
      });
    }
  };

  const startStop = () => {
    stopAudioPlay();
    setTimerIsRun(!timerIsRun);
    if (!timerIsRun) {
      // let now = new Date();
      setTimerId(() =>
        setInterval(() => {
          setCurrentTimer((prevCurrentTimer) => {
            return prevCurrentTimer - 1;
          });
        }, 1000)
      );
    } else {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  // The following code helps to reduce time error but in this case it is impossible to pass the test on FreeCodeCamp
  //anyway I leave it here

  // const runningTimer = (initialTime) => {
  //   let currentTime = new Date();
  //   let difference = (currentTime - initialTime) / 1000;
  //   if (difference >= i) {
  //     setCurrentTimer((prevCurrentTimer) => {
  //       return prevCurrentTimer - 1;
  //     });
  //     i++;
  //   }
  // };

  const reset = () => {
    stopAudioPlay();
    clearInterval(timerId);
    setTimerId(null);
    setTimerIsRun(false);
    setIsItSession(true);
    setDislplayTimer("25:00");
    setCurrentTimer(25 * 60);
    setSessionTimer(25 * 60);
    setBreakTimer(5 * 60);
    // i = 1;
  };

  const stopAudioPlay = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  useLayoutEffect(() => {
    let minutes = Math.trunc(currentTimer / 60);
    let seconds = Math.round((currentTimer / 60 - minutes) * 60);
    if (currentTimer > 0) {
      setDislplayTimer(
        `${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`
      );
    } else if (currentTimer === 0) {
      setDislplayTimer("00:00");
      setIsItSession(!isItSession);
    } else if (currentTimer < 0) {
      audioRef.current.play();
      setCurrentTimer(isItSession ? sessionTimer : breakTimer);
    }
  }, [currentTimer]);

  useEffect(() => {
    if (isItSession) {
      setCurrentTimer(sessionTimer);
    }
  }, [sessionTimer]);

  useEffect(() => {
    if (!isItSession) {
      setCurrentTimer(breakTimer);
    }
  }, [breakTimer]);

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <Timer displayTimer={displayTimer} isItSession={isItSession} />
      <ControlPanel startStop={startStop} reset={reset} />
      <div className="lengthSetters">
        <LengthSetter
          content="break"
          counter={breakTimer / 60}
          manageSessionLength={manageSessionLength}
          timerIsRun={timerIsRun}
        />
        <LengthSetter
          content="session"
          counter={sessionTimer / 60}
          manageSessionLength={manageSessionLength}
          timerIsRun={timerIsRun}
        />
      </div>
      <audio
        ref={audioRef}
        id="beep"
        src={metalGearBeep}
        preload="true"
        type="audio/mpeg"
      ></audio>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
