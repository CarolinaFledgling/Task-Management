import React, { Component } from "react";
import "./CountDown.css";

class CountdownTimer extends Component {
  // static defaultProps = {
  //   isStartStopVisibleinLists: false,
  // };
  constructor(props) {
    super(props);
  }

  render() {
    const { time, elapsedTime, isStartBtn } = this.props.task;
    const { onStart, isStartStopVisibleinLists, onStop } = this.props;
    const totalTimeinSeconds = time;
    const timeLeftinSeconds = totalTimeinSeconds - elapsedTime;
    const minuteLeft = Math.floor(timeLeftinSeconds / 60);
    const secondLeft = Math.floor(timeLeftinSeconds % 60);
    return (
      <div>
        <div>
          <p>
            <strong>Name of you task:</strong>
          </p>
          <p>
            Time Remaining: {minuteLeft <= 9 ? "0" + minuteLeft : minuteLeft}:
            {secondLeft <= 9 ? "0" + secondLeft : secondLeft}
          </p>
          <button
            disabled={isStartBtn}
            className="startBtn"
            type="button"
            onClick={onStart}
            style={{
              display: isStartStopVisibleinLists ? "block" : "none",
            }}
          >
            Start
          </button>
          <button
            disabled={!isStartBtn}
            className="stopBtn"
            type="button"
            onClick={onStop}
            style={{
              display: isStartStopVisibleinLists ? "block" : "none",
            }}
          >
            Stop
          </button>
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
