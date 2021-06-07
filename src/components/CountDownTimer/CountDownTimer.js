import React, { Component } from "react";
import "./CountDown.css";

class CountdownTimer extends Component {
  // static defaultProps = {
  //   isStartStopVisibleinLists: false,
  // };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { time, elapsedTime, isStartBtn } = this.props.task;
    const { onStart, isStartStopVisibleinLists, onStop } = this.props;
    return (
      <div>
        <div>
          <p>
            <strong>Name of you task:</strong>{" "}
          </p>
          <p>Time: {time} seconds</p>
          <p>Elapsed time: {elapsedTime}</p>
          <p>Time Remaining: {time - elapsedTime}</p>
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
