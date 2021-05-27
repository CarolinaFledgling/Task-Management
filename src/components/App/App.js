import "./App.css";
import React from "react";
import AddTaskPanel from "../AddTaskPanel/AddTaskPanel";
import TaskList from "../TaskList/TaskList";
import SearchBar from "../SearchBar/SearchBar";
import SearchList from "../SearchList/SearchList";

class App extends React.Component {

  static defaultProps = { isDeleteBtnVisible: true };

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        //   {
        //     id: 0,
        //     text: 'Nauka Reacta',
        //     time: 60,
        //     elapsedTime:0
        //    },
      ],
      searchList: [],
      searchText: "",
      counter: 0,
    };
  }

  // Usunięcie pojedynczego zadania
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

  // Usunięcie wszystkich tasków
  handleDeleteAllTasks = () => {
    const tasks = this.state.tasks;
    this.setState({
      tasks: [],
    });
  };

  // Dodanie pojedynczego Taska
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

  // Wyszukanie zadania
  //searchtext - wpisany tekst w input
  handlerSearchTask = (text) => {
    console.log("szukaj", text);
    this.setState({
      searchText: text,
    });
  };

  componentDidMount() {}

  componentWillUnmount() {}

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

    return (
      <div className="app">
        <div className="left-side">
          <AddTaskPanel
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
            isDeleteBtnVisible={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
