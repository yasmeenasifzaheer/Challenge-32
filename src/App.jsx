import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [inputTime, setInputTime] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0 && isRunning) {
      setIsRunning(false);
      alert("⏰ Time's up!");
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const startTimer = () => {
    if (seconds > 0) setIsRunning(true);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setInputTime("");
  };

  const setCustomTime = () => {
    const time = parseInt(inputTime, 10);
    if (!isNaN(time) && time > 0) {
      setSeconds(time);
      setIsRunning(false);
    } else {
      alert("Enter a valid number of seconds");
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="app">
      <div className="timer-card">
        <h1>Digital Timer Counter</h1>

        <div className="timer">{formatTime(seconds)}</div>

        <input
          type="number"
          placeholder="Enter time in seconds"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />

        <div className="buttons">
          <button onClick={setCustomTime}>Set Time</button>
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
