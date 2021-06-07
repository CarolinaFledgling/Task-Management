import "./App.css";
import React from "react";
import AddTaskPanel from "../AddTaskPanel/AddTaskPanel";
import TaskList from "../TaskList/TaskList";
import SearchBar from "../SearchBar/SearchBar";
import SearchList from "../SearchList/SearchList";
import Heading from "../Heading/Heading";

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
    console.log(task, this.state.counter);

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task],
    }));
    return;
  };

  handlerSearchTask = (text) => {
    console.log("szukaj", text);
    this.setState({
      searchText: text,
    });
  };

  handleTaskStart = (task) => {
    console.log("Start task", { task });

    const taskIntervalId = setInterval(() => {
      this.setState((prevState) => {
        //update every second
        const foundTask = prevState.tasks.find((value) => value.id === task.id);

        const nextTasks = prevState.tasks.map((value) => {
          if (value.id === task.id) {
            return {
              ...foundTask,
              elapsedTime: foundTask.elapsedTime + 1,
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

    console.log("Data:", this.props);

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
            deleteTask={this.handleDeleteTask}
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
