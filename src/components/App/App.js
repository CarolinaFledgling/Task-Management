import './App.css';
import React from 'react'
import AddTaskPanel from '../AddTaskPanel/AddTaskPanel';
import TaskList from '../TaskList/TaskList';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 0,
          text: 'Nauka Reacta',
          time: 60,

        },
        {
          id: 1,
          text: 'Nauka pure JavaScript',
          time: 60,

        },
        {
          id: 2,
          text: 'Nauka HTML',
          time: 20,

        },
        {
          id: 3,
          text: 'Nauka CSS',
          time: 30,
        },

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
  render() {
    return (
      <div className='app'>
        <AddTaskPanel />
        <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} />
      </div>
    );
  }
}

export default App;