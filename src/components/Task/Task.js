import React from "react";
import CountdownTimer from "../CountdownTimer/CountDownTimer";
import "./Task.css";

class Task extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handleDeleteTask = () => {
    this.props.onDeleteTask(this.props.task, this.props.index);
  };

  handleStart = () => {
    this.props.onStart(this.props.task);
  };

  handleStop = () => {
    this.props.onStop(this.props.task);
  };

  render() {
    const { text, time } = this.props.task;
    return (
      <li className="item">
        <h3> {text}</h3>
        <p>Your set time: {time} seconds</p>
        <CountdownTimer
          onStart={this.handleStart}
          onStop={this.handleStop}
          task={this.props.task}
          isStartStopVisibleinLists={this.props.isStartStopVisibleinLists}
        />
        <button onClick={this.handleDeleteTask}>Delete</button>
      </li>
    );
  }
}

export default Task;
