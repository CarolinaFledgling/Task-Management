
import './App.css';
import React from 'react';
import CountDownTimer from './components/CountDownTimer/CountDownTimer'
import SearchBar from './components/SearchBar/SearchBar';

class App extends React.Component {
  intervalId = null;
  constructor(props) {
    super(props)

    this.inputSearchValue = React.createRef();

    this.state = {
      listTasks: [],
      searchResult: [],
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeinSeconds: 0, // czas upłynięty w sekundach
      inputFieldText: 'Uczę sie Reacta',
      inputFieldTime: 0,


    }
  }




  // Adding tasks , gathering value from input 

  handlerAddTask = () => {
    this.setState((prevState) => {
      const newListTasks = [...prevState.listTasks, {
        name: prevState.inputFieldText,
        time: prevState.inputFieldTime,
        // zrobic tak aby kazde zadanie dostawło swoj licznik 
      }]

      console.log(this.licznik)
      return {
        listTasks: newListTasks,
      };
    });
  };

  // Deleting tasks from both lists 
  handleDeleteTask = (index, element) => {
    const positionItemListTask = this.state.listTasks.indexOf(element)
    const positionItemSearchResultList = this.state.searchResult.indexOf(element)

    console.log('kliknieto usun item:', { index, element, positionItemListTask, positionItemSearchResultList });

    if (positionItemListTask > -1) {
      const newListOfTasks = [...this.state.listTasks]
      newListOfTasks.splice(positionItemListTask, 1)
      this.setState({ listTasks: newListOfTasks })
    }

    if (positionItemSearchResultList > -1) {
      const newListOfResultSearch = [...this.state.searchResult]
      newListOfResultSearch.splice(positionItemSearchResultList, 1)
      this.setState({ searchResult: newListOfResultSearch })
    }
  }

  // Deleting all tasks from main list 
  handleDeleteAllTasks = () => {
    console.log('Moja lista', this.state.listTasks)
    return this.setState({ listTasks: [] })
  }
  // Deleting all tasks from list from SearchBar
  handleDeleteSearchTask = () => {
    this.setState({ searchResult: [] })
  }

  // Searching  tasks in SearchBar 
  handleSearchValue = () => {
    const valueOfSearchInput = this.inputSearchValue.current.value;
    console.log(valueOfSearchInput)

    this.setState((prevState) => {
      const filteredItem = prevState.listTasks.filter((element) => {
        return element.name.toLowerCase().includes(valueOfSearchInput.toLowerCase())
      })
      return {
        searchResult: filteredItem,
      }
    })
  }

  // ------------------------------------------------------------------------------//
  //komponenn kontrolowany 

  handleOnChangeInputText = (e) => {
    this.setState({ inputFieldText: e.target.value })
  }

  handleOnChangeInputTime = (e) => {
    this.setState({ inputFieldTime: e.target.value })
  }


  // -------------------------------------------------------------------------------------------//

  //  functionality start stop & pause 


  handleStopBtnCountDown = () => {
    console.log(this)
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeinSeconds: 0
    })
    this.stopTimer()
  }


  handleStartBtnCountDown = (index) => {
    console.log('działa start')
    this.setState({
      isRunning: true,
    })
    console.log(index)
    this.startTimer()
  }

  handleTogglePause = () => {
    this.setState(
      function (prevState) {
        const isPaused = !prevState.isPaused // liczba przerw zalezy od aktualnego stanu isPaused
        if (isPaused) {
          this.stopTimer()
        } else {
          this.startTimer()
        }
        return {
          isPaused: !prevState.isPaused,
          pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount //jeśli jestesmy w trakcie przerwy to aktualna wartosc jest rowna poprzedniej wartosci + 1, jesli nie to zwracamy poprzrdnia wartosc
        }
      }
    )
  }

  componentDidMount() {
    if (this.state.isRunning === true) {
      this.startTimer()
    }

  }

  startTimer = () => {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => ({
          elapsedTimeinSeconds: prevState.elapsedTimeinSeconds + 1
        })
      )
    }, 1000)
  }


  componentWillUnmount() {
    this.stopTimer()
  }

  stopTimer = () => {
    clearInterval(this.intervalId)
  }


  render() {
    //elapsedTimeinSecond czas ktory upłynal
    const { isPaused, isRunning, pausesCount, elapsedTimeinSeconds, inputFieldTime } = this.state;
    const totalTimeinSeconds = inputFieldTime * 60; // całkowity czas w sekundach
    const timeLeftinSeconds = totalTimeinSeconds - elapsedTimeinSeconds // ile czasu zostalo nam w sekundach
    const minutesLeft = Math.floor(timeLeftinSeconds / 60)
    const secondsLeft = Math.floor(timeLeftinSeconds % 60) // reszta z dzielenia 


    const filterResults = this.state.searchResult.map((element, index) => {
      return (
        <li>
          <CountDownTimer
            key={element.id}
            minutes={minutesLeft}
            seconds={secondsLeft}
            onTogglePause={this.handleTogglePause}
            onStartCountDown={this.handleStartBtnCountDown}
            onStopCountDown={this.handleStopBtnCountDown}
            isRunning={isRunning}
            isPaused={isPaused}
            countPausa={pausesCount}
            deleteTask={this.handleDeleteTask}
            name={element.name}
            time={element.time}
            element={element}
            index={index}
          />
        </li>
      )
    })
    return (
      <div className='App'>
        <div className="layout">
          <div className="flex-left">
            <h1>Timer`s to Do Lists</h1>
            <form>
              <input value={this.state.inputFieldText} onChange={this.handleOnChangeInputText} type="text" placeholder="your task for today"></input>
              <input value={this.state.inputFieldTime} onChange={this.handleOnChangeInputTime} type="number" placeholder="for how long"></input>
            </form>
            <button onClick={this.handlerAddTask}>Add task</button>
            <button onClick={this.handleDeleteAllTasks}>Clean tasks</button>
            <ol>
              {this.state.listTasks.map((element, index) => {
                return (
                  <li>
                    <CountDownTimer
                      key={element.id}
                      minutes={minutesLeft}
                      seconds={secondsLeft}
                      onTogglePause={this.handleTogglePause}
                      onStartCountDown={this.handleStartBtnCountDown}
                      onStopCountDown={this.handleStopBtnCountDown}
                      isRunning={isRunning}
                      isPaused={isPaused}
                      countPausa={pausesCount}
                      deleteTask={this.handleDeleteTask}
                      index={index} name={element.name}
                      time={element.time}
                      element={element}
                    />
                  </li>
                )
              })
              }
            </ol>
          </div>
          <div className="flex-righ">
            <SearchBar filterResults={filterResults} />
          </div>
        </div>
      </div>
    )
  }
}
export default App;
