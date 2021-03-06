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
      isStopBtn: false,
      isNotificationOn: false,
    };
    
    this.url = "/bell.mp3";
    this.audio = new Audio(this.url);
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
      isStopBtn: true,
      isNotificationOn: false,
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

        let nextElapsedTime = foundTask.elapsedTime;

        if (foundTask.time === foundTask.elapsedTime) {
          // console.log("foundTask.time", foundTask.time);
          // console.log("foundTask.elapsed", foundTask.elapsedTime);
          clearInterval(foundTask.intervalId);
          this.audio.play();
          foundTask.isStopBtn = false;
          foundTask.isNotificationOn = true;
        } else {
          nextElapsedTime++;
        }

        if (foundTask.isNotificationOn) {
          this.handlerStartNotification();
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
      isStopBtn: true,
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
      isStopBtn: false,
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
        isStartBtn: false,
        isNotificationOn: false,
      };
    });

    this.setState({
      tasks: clearedTasks,
      searchText: "",
    });
  };

  handlerStartNotification = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        doNotify();
      } else {
        //notification == denied
        Notification.requestPermission()
          .then(function (result) {
            console.log(result); //granted || denied
            if (Notification.permission == "granted") {
              doNotify();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    function doNotify() {
      let title = "-TASK-📔- MANAGEMENT- 😉";
      // let t = Date.now() + 120000; //2 mins in future
      let options = {
        body: "End of time in the task",
        lang: "en-CA",
        // timestamp: t,
      };
      let n = new Notification(title, options);

      // n.addEventListener("show", function (ev) {
      //   console.log("SHOW", ev.currentTarget.data);
      // });
      // n.addEventListener("close", function (ev) {
      //   console.log("CLOSE", ev.currentTarget.body);
      // });
      setTimeout(n.close.bind(n), 3000); //close notification after 3 seconds
    }
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
      <div className="app wrapper">
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
