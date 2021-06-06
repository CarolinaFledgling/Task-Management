import React, { Component } from "react";
import "./AddTaskPanel.css";

class AddTaskPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      time: "",
    };
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleTime = (event) => {
    this.setState({
      time: event.target.value,
    });
  };

  // Add task
  handleClickTask = () => {
    const { text, time } = this.state;
    if (text.length > 2) {
      const add = this.props.addTask(text, time);
      if (add) {
        this.setState({
          text: "",
          time: "",
        });
      }
    } else {
      alert(" too short task !");
    }
  };

  handlerClearTimers = () => {
    this.props.onClearTimer();
    this.setState({
      time: "",
      text: "",
    });
  };

  handleDeleteTasks = () => {
    this.props.onDeleteAllTasks();
  };

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>What are your top tasks today?</p>
        <button onClick={this.handlerClearTimers}>
          Clear Timers and Inputs{" "}
        </button>
        <form className="form">
          <input
            className="input-field"
            type="text"
            placeholder="Add your task"
            value={this.state.text}
            onChange={this.handleText}
          ></input>
          <input
            className="input-field"
            type="number"
            placeholder="For how long?"
            value={this.state.time}
            onChange={this.handleTime}
          ></input>
        </form>
        <button onClick={this.handleClickTask}>Add your Task</button>
        <button className="btnCleanTasks" onClick={this.handleDeleteTasks}>
          Clean Tasks
        </button>
      </div>
    );
  }
}

export default AddTaskPanel;
