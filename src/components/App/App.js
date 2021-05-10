import './App.css';
import React from 'react'
import AddTaskPanel from '../AddTaskPanel/AddTaskPanel';
import TaskList from '../TaskList/TaskList';



class App extends React.Component {

  // counter dla ID pojedynczego taska 
  counter = 0;


  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        // {
        //   id: 0,
        //   text: 'Nauka Reacta',
        //   time: 60,

        // },
        // {
        //   id: 1,
        //   text: 'Nauka pure JavaScript',
        //   time: 60,

        // },
        // {
        //   id: 2,
        //   text: 'Nauka HTML',
        //   time: 20,

        // },
        // {
        //   id: 3,
        //   text: 'Nauka CSS',
        //   time: 30,
        // },

      ]
    }
  }
  // kazde nasze zadanie jest odzielnym obiektem posiadajacy różne właściwosci


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
  render() {
    return (
      <div className='app'>
        <AddTaskPanel addTask={this.addTask} />
        <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} />
      </div>
    );
  }
}

export default App;