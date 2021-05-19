import React, { Component } from "react";
import "./Countdown.css";

class CountdownTimer extends Component {
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
          <p>Time: {this.props.task.time}</p>
          <p>Elapsed time: {this.props.task.elapsedTime}</p>
          <button
            className="startBtn"
            type="button"
            onClick={this.props.onStart}
          >
            Start
          </button>
          <button className="stopBtn" type="button" onClick={this.props.onStop}>
            Stop
          </button>
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
