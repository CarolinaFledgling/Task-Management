import "./App.css";
import React from "react";
import AddTaskPanel from "../AddTaskPanel/AddTaskPanel";
import TaskList from "../TaskList/TaskList";
import SearchBar from "../SearchBar/SearchBar";
import SearchList from "../SearchList/SearchList";

const EMPTY_LIST = [];

class App extends React.Component {
  counter = 0;
  // ID setintervala

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        //   {
        //     id: 0,
        //     text: 'Nauka Reacta',
        //     time: 60,
        //    },
      ],
      searchList: [],
      searchText: "",
      isRunning: false,
      elapsedTimeinSeconds: 15 * 60, //15min
    };
  }

  // usunięcie pojedynczego zadania
  deleteTask = (element, index) => {
    const indexTask = this.state.tasks.indexOf(element);
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

  // Dodanie pojedynczego Taska
  // Co muszę zrobić : muszę stworzyć nowy obiekt na podstawie danych z inputów i dodany do listy Tasks
  // funkcja addTask musi otrzymać: text-tekst z inputa, time -czas z inputa , musimy przekazac w AddTaskPanel do fn która tam wywołujemy
  addTask = (text, time) => {
    const task = {
      id: this.counter,
      text,
      time,
      elapsedTime: 0,
      isRunning: false,
    };
    this.counter++;
    console.log(task, this.counter);

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task], // isRunings dodac to do kazdego zadania a pozniej naciskajac guzik start w countdwon zamienic isRuning na start i czy wtedy to odpali funkcje startTimer ?
    }));
    return true;
  };

  //  Wyszukanie zadania
  //searchtext - wpisany tekst w input
  handlerSearchTask = (text) => {
    console.log("szukaj", text);
    this.setState({
      searchText: text,
    });
  };

 
  componentDidMount() {}


  componentWillUnmount() {
    // TODO: Wyczysic wszystkie timery w task.
  }

  handleTaskStart = (task) => {
    console.log("Start task", { task });

    const taskIntervalId = setInterval(() => {
      this.setState((prevState) => {
        const foundTask = prevState.tasks.find((value) => value.id === task.id);

        const nextTask = {
          ...foundTask,
          elapsedTime: foundTask.elapsedTime + 1,
        };

        const nextTasks = prevState.tasks.map((value) => {
          if (value.id === task.id) {
            return nextTask;
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

  render() {
    let filteredTask = EMPTY_LIST;

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
          <AddTaskPanel addTask={this.addTask} tasks={this.state.tasks}/>
          <TaskList
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            onStart={this.handleTaskStart}
            onStop={this.handleTaskStop}
          />
        </div>
        <div className="right-side">
          <SearchBar
            text={this.state.searchText}
            handlerSearchTask={this.handlerSearchTask}
          />
          <SearchList tasksSearched={filteredTask} />
        </div>
      </div>
    );
  }
}

export default App;
