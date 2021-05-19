import React, { Component } from "react";
import "./AddTaskPanel.css";

class AddTaskPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      number: "",
    };
  }

  handleText = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleTime = (event) => {
    this.setState({
      number: event.target.value,
    });
  };

  // Add task
  handleClickTask = () => {
    const { text, number } = this.state;

    if (text.length > 2) {
      const add = this.props.addTask(text, number);
      if (add) {
        this.setState({
          text: "",
          number: "",
        });
      }
    } else {
      alert(" too short task !");
    }
  };

  // Clear all timers

  handlerClearTimers = () => {
    let tasks = this.props.tasks;
    console.log(tasks);
    tasks = tasks.map((task) => {
      clearInterval(task.intervalId);
      task.elapsedTime = 0;
    });

    console.log(tasks);
  };

  render() {
    return (
      <div>
        <h1>- Task - Management - 🔥</h1>
        <p>What are your top tasks today?</p>
        <button onClick={this.handlerClearTimers}>Clear All Timers</button>
        <form className="">
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
            placeholder="For how long ?"
            value={this.state.number}
            onChange={this.handleTime}
          ></input>
        </form>
        <button onClick={this.handleClickTask}>Add your Task</button>
      </div>
    );
  }
}

export default AddTaskPanel;
