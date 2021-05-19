import React from "react";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import "./Task.css";

class Task extends React.Component {
  static defaultProps = { isDeleteBtnVisible: true };
  constructor(props) {
    super(props);
  }

  handleDeleteTask = () => {
    this.props.deleteTask(this.props.task, this.props.index);
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
        <p>Your set time: {time} min</p>
        <CountdownTimer
          onStart={this.handleStart}
          onStop={this.handleStop}
          task={this.props.task}
        />
        <button
          style={{ display: this.props.isDeleteBtnVisible ? "block" : "none" }}
          onClick={this.handleDeleteTask}
        >
          Delete
        </button>
      </li>
    );
  }
}

export default Task;
