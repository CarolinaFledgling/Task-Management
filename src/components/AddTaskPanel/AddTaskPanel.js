import React, { Component } from "react";
import Heading from "../Heading/Heading";
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

  handleClickTask = () => {
    const { text, time } = this.state;
    if (text.length > 3 && time !== "") {
      const add = this.props.addTask(text.toUpperCase(), parseInt(time, 10));
      if (add) {
        this.setState({
          text: "",
          time: "",
        });
      }
    } else {
      alert(
        "This task is too short, minimum of 3 characters and set some time for that Task 🔥"
      );
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
        <Heading />
        <form className="form">
          <input
            className="input-field"
            type="text"
            placeholder="Add your task eg. Study React"
            value={this.state.text}
            onChange={this.handleText}
          ></input>
          <input
            className="input-field"
            type="number"
            placeholder="For how long? eg. 60 min"
            value={this.state.time}
            onChange={this.handleTime}
          ></input>
        </form>
        <button onClick={this.handleClickTask}>Add your Task</button>
        <button className="btnCleanTasks" onClick={this.handleDeleteTasks}>
          Clean Lists
        </button>
        <button className='btnResetTimeAndCleanText' onClick={this.handlerClearTimers}>
          Reset Time and Clean Text
        </button>
      </div>
    );
  }
}

export default AddTaskPanel;
