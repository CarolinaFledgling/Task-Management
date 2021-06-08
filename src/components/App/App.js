import "./App.css";
import React from "react";
import AddTaskPanel from "../AddTaskPanel/AddTaskPanel";
import TaskList from "../TaskList/TaskList";
import SearchBar from "../SearchBar/SearchBar";
import SearchList from "../SearchList/SearchList";

class App extends React.Component {
  static defaultProps = {
    isStartStopVisibleinLists: false,
    isStartStopVisibleinTaskList: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      searchList: [],
      searchText: "",
      counter: 0,
      isStartBtn: false,
    };
  }

  handleDeleteTask = (taskToRemove, index) => {
    clearInterval(taskToRemove.intervalId);

    const indexTask = this.state.tasks.indexOf(taskToRemove);
    console.log(`kliknięto task na pozycji: ${indexTask} o index-ie ${index}`);

    if (indexTask > -1) {
      this.setState((prevState) => {
        const newListTasks = [...prevState.tasks];
        newListTasks.splice(indexTask, 1);

        return {
          tasks: newListTasks,
        };
      });
    }
  };

  handleDeleteAllTasks = () => {
    const tasks = this.state.tasks;
    this.setState({
      tasks: [],
    });
  };

  addTask = (text, time) => {
    const task = {
      id: this.state.counter,
      text,
      time,
      elapsedTime: 0,
    };
    this.state.counter++;

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task],
    }));
    return;
  };

  handlerSearchTask = (text) => {
    this.setState({
      searchText: text,
    });
  };

  handleTaskStart = (task) => {
    const taskIntervalId = setInterval(() => {
      this.setState((prevState) => {
        const foundTask = prevState.tasks.find((value) => value.id === task.id);
        console.log("foundTask", foundTask);
        console.log("foundTask.elapsed", foundTask.elapsedTime);
        console.log("isPassed: ", foundTask.time === foundTask.elapsedTime);
        // time = targetTime = czas docelowy: 30s
        // elapsedTime = uplynietyCzas = ileUbyloCzasu = ileCzasuUbylo: 29s
        // ile zostalo = 1s
  
        let nextElapsedTime = foundTask.elapsedTime;
        if (foundTask.time === foundTask.elapsedTime) {
          // console.log("foundTask.time", foundTask.time);
          // console.log("foundTask.elapsed", foundTask.elapsedTime);
          clearInterval(foundTask.intervalId);
        } else {
          nextElapsedTime++;
        }

        const nextTasks = prevState.tasks.map((value) => {
          if (value.id === task.id) {
            return {
              ...foundTask,
              elapsedTime: nextElapsedTime,
            };
          }
          return value;
        });

        return {
          tasks: nextTasks,
        };
      });
    }, 1000);

    const nextTask = {
      ...task,
      intervalId: taskIntervalId,
      isStartBtn: true,
    };

    this.setState((prevState) => {
      const nextTasks = prevState.tasks.map((value) => {
        if (value.id === nextTask.id) {
          return nextTask;
        }
        return value;
      });

      return {
        tasks: nextTasks,
      };
    });
  };

  handleTaskStop = (task) => {
    console.log("Stop task", { task });
    clearInterval(task.intervalId);

    const nextTask = {
      ...task,
      isStartBtn: false,
    };

    this.setState((prevState) => {
      const nextTasks = prevState.tasks.map((value) => {
        if (value.id === nextTask.id) {
          return nextTask;
        }
        return value;
      });
      return { tasks: nextTasks };
    });
  };

  handleClearTimer = () => {
    const tasks = this.state.tasks;
    const clearedTasks = tasks.map((task) => {
      clearInterval(task.intervalId);
      return {
        ...task,
        elapsedTime: 0,
      };
    });

    this.setState({
      tasks: clearedTasks,
      searchText: "",
    });
  };

  render() {
    let filteredTask = null;

    if (this.state.searchText) {
      filteredTask = this.state.tasks.filter((task) => {
        return task.text
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase());
      });
    }

    // console.log("Data:", this.props);

    return (
      <div className="app">
        <div className="left-side">
          <AddTaskPanel
            title={this.props.title}
            addTask={this.addTask}
            tasks={this.state.tasks}
            onClearTimer={this.handleClearTimer}
            onDeleteAllTasks={this.handleDeleteAllTasks}
          />
          <TaskList
            tasks={this.state.tasks}
            onDeleteTask={this.handleDeleteTask}
            onStart={this.handleTaskStart}
            onStop={this.handleTaskStop}
            isStartStopVisibleinTaskList={
              this.props.isStartStopVisibleinTaskList
            }
          />
        </div>
        <div className="right-side">
          <SearchBar
            text={this.state.searchText}
            handlerSearchTask={this.handlerSearchTask}
          />
          <SearchList
            tasksSearched={filteredTask}
            onDeleteTask={this.handleDeleteTask}
            isStartStopVisibleinLists={this.props.isStartStopVisibleinLists}
          />
        </div>
      </div>
    );
  }
}

export default App;
