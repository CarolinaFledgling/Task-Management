import './App.css';
import React from 'react'
import AddTaskPanel from '../AddTaskPanel/AddTaskPanel';
import TaskList from '../TaskList/TaskList';
import SearchBar from '../SearchBar/SearchBar';
import SearchList from '../SearchList/SearchList'




class App extends React.Component {

  // counter dla ID pojedynczego taska 
  counter = 0;


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
    }
  }



  // usunięcie pojedynczego zadania 
  deleteTask = (element, index) => {
    const indexTask = this.state.tasks.indexOf(element)
    console.log(`kliknięto task na pozycji: ${indexTask} o index-ie ${index}`)

    if (indexTask > -1) {
      this.setState((prevState) => {
        const newListTasks = [...prevState.tasks]
        newListTasks.splice(indexTask, 1)

        return {
          tasks: newListTasks
        }

      })
    }
  }

  // Dodanie pojedynczego Taska 
  // Co muszę zrobić : muszę stworzyć nowy obiekt na podstawie danych z inputów i dodany do listy Tasks
  // funkcja addTask musi otrzymać: text-tekst z inputa, time -czas z inputa , musimy przekazac w AddTaskPanel do fn która tam wywołujemy 
  addTask = (text, time) => {
    // utworzyć obiekt pojedynczego nowego taska
    const task =
    {
      id: this.counter,
      text,
      time,
    }
    this.counter++
    console.log(task, this.counter)

    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }))
    return true
  }

  //  Wyszukanie zadania
  //searchtext - wpisany tekst w input
  handlerSearchTask = (text) => {
    console.log('szukaj', text);

    this.setState((prevState) => {
      const tasks = [...prevState.tasks]
      console.log(tasks)

      const filteredTask = tasks.filter((task) => {
        console.log('task.text:', task.text)
        console.log('text:', text)
        return task.text.toLowerCase().includes(text.toLowerCase())
      })

      return {
        searchText: text,
        searchList: filteredTask,
      }
    });
  }

  render() {
    return (
      <div className='app'>
        <div className='left-side'>
          <AddTaskPanel addTask={this.addTask} />
          <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} />
        </div>
        <div className='right-side'>
          <SearchBar text={this.state.searchText} handlerSearchTask={this.handlerSearchTask} />
          <SearchList tasksSearched={this.state.searchList} />
        </div>
      </div>
    );
  }
}

export default App;