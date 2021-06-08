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
    const { time, elapsedTime, isStartBtn, isStopBtn } = this.props.task;
    const { onStart, isStartStopVisibleinLists, onStop } = this.props;
    // for faster testing, we test the timer in seconds if you want to have minutes add : time * 60
    const totalTimeinSeconds = time;
    const timeLeftinSeconds = totalTimeinSeconds - elapsedTime;
    const minuteLeft = Math.floor(timeLeftinSeconds / 60);
    const secondLeft = Math.floor(timeLeftinSeconds % 60);
    return (
      <div>
        <div>
          <p>
            Time Remaining:{" "}
            <strong>
              {minuteLeft <= 9 ? "0" + minuteLeft : minuteLeft}:
              {secondLeft <= 9 ? "0" + secondLeft : secondLeft}{" "}
            </strong>
            🔔
          </p>
          <div className="buttons-Stop-Start">
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
              // jezeli isStartBtn rowna sie true i isStopBtn rowna sie false wtedy displabled oba
              disabled={isStartBtn === true && isStopBtn === false}
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
      </div>
    );
  }
}

export default CountdownTimer;
