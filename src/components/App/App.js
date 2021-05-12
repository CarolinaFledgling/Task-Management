import './App.css';
import React from 'react'
import AddTaskPanel from '../AddTaskPanel/AddTaskPanel';
import TaskList from '../TaskList/TaskList';
import SearchBar from '../SearchBar/SearchBar';
import SearchList from '../SearchList/SearchList'




class App extends React.Component {

  // counter dla ID pojedynczego taska 
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
    const task =
    {
      id: this.counter,
      text,
      time,
      isRunning: false,
    }
    this.counter++
    console.log(task, this.counter)

    this.setState(prevState => ({
      tasks: [...prevState.tasks, task] // isRunings dodac to do kazdego zadania a pozniej naciskajac guzik start w countdwon zamienic isRuning na start i czy wtedy to odpali funkcje startTimer ?
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

  // Funkcjonalnosc dla licznika 
  componentDidMount() {
    this.startTimer()
  }

  // Countdwon 

  // potrzebuje zastapic elapsedTimeinSeconds , moim czasem wpisanym w input text przy dodawaniu zadania ?
  // przekazac do komponentu countdown minutesleft i secondleft aby wyswietlic 
  // przekazac do komponentu countdown zawartosc text z inputa

  // jak uruchamiamy timer, nasza wartosc z inputa to elapsedTimeinSeconds
  // setinterval przyjmuje dwa parametry , pierwszy funkcja która bedzie wywołyana co jakis czas i co ile sekund ma sie ona wywoływac

  startTimer = () => {
    this.intervalId = setInterval(() => {
      const totalTimeinSeconds = 30 * 60; // wartosc domyslna 30min// całkowity czas w sekundach bedzie 30 min (początkowa wartosc)
      const timeLeftinSeconds = totalTimeinSeconds - this.state.elapsedTimeinSeconds // ile czasu zostalo nam w sekundach
      const minutesLeft = Math.floor(timeLeftinSeconds / 60) //ile pełnych minut nam zostało 
      const secondsLeft = Math.floor(timeLeftinSeconds % 60)
      console.log(minutesLeft, ':', secondsLeft)

      this.setState((prevState) => ({
        elapsedTimeinSeconds: prevState.elapsedTimeinSeconds + 1
      }))
    }, 1000)
    console.log(this.state.elapsedTimeinSeconds)
  }


  componentWillUnmount() {
    this.stopTimer()
  }

  stopTimer = () => {
    clearInterval(this.intervalId)
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