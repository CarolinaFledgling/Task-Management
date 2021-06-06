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
    return (
      <div>
        <div>
          <p>
            <strong>Name of you task:</strong>{" "}
          </p>
          <p>Time: {this.props.task.time} seconds</p>
          <p>Elapsed time: {this.props.task.elapsedTime}</p>
          <p>
            Time Remaining: {this.props.task.time - this.props.task.elapsedTime}
          </p>
          <button
            disabled={this.props.task.isStartBtn}
            className="startBtn"
            type="button"
            onClick={this.props.onStart}
            style={{
              display: this.props.isStartStopVisibleinLists ? "block" : "none",
            }}
          >
            Start
          </button>
          <button
            disabled={!this.props.task.isStartBtn}
            className="stopBtn"
            type="button"
            onClick={this.props.onStop}
            style={{
              display: this.props.isStartStopVisibleinLists ? "block" : "none",
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
