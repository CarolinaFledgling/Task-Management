
import './App.css';
import React from 'react';
import CountDownTimer from './components/CountDownTimer/CountDownTimer'

class App extends React.Component{
  constructor(props){
    super(props)

    this.inputFieldText= React.createRef();
    this.inputFieldTime= React.createRef();

    this.inputSearchValue=React.createRef();

    this.state = {
      listTasks: [],
      searchResult:[],
      isRunning:true,
      isPaused:false,
      pausesCount:0,
    }

  }

  handlerAddTask = () => {
    const inputTaskText= this.inputFieldText.current.value;
    const inputTimeTask=this.inputFieldTime.current.value;
    console.log(inputTaskText,inputTimeTask)

    this.setState((prevState)=>{
      const newListTasks = [...prevState.listTasks, {
        name:inputTaskText,
        time:inputTimeTask,
        } ]  
        console.log(Array.isArray(newListTasks))
      return {
        listTasks: newListTasks,
        
      };
     
    });
    
  };

  handleDeleteTask=(index, element)=> {
    const positionItemListTask = this.state.listTasks.indexOf(element)
    const positionItemSearchResultList = this.state.searchResult.indexOf(element)

    console.log('kliknieto usun item:', { index, element, positionItemListTask, positionItemSearchResultList} );  

    if(positionItemListTask > -1) {

      const newListOfTasks = [...this.state.listTasks]
      newListOfTasks.splice(positionItemListTask, 1)

      this.setState({listTasks: newListOfTasks})

    }

    if(positionItemSearchResultList > -1) {
      const newListOfResultSearch = [...this.state.searchResult]
      newListOfResultSearch.splice(positionItemSearchResultList, 1)

      this.setState({searchResult:newListOfResultSearch})
    }
  }

  handleDeleteAllTasks=()=>{
  console.log('Moja lista',this.state.listTasks)
  return this.setState({listTasks:[]})

  }

  // Szukanie elementów 

  handleSearchValue =()=>{
    const valueOfSearchInput= this.inputSearchValue.current.value;
    console.log(valueOfSearchInput)

    this.setState((prevState)=>{

      const filteredItem = prevState.listTasks.filter((element)=>{
      return element.name.toLowerCase().includes(valueOfSearchInput.toLowerCase())
    })

        return {
          searchResult: filteredItem,
        }
    })
   
  }

  // Delete All tasks in Seach bar 

  handleDeleteSearchTask=()=>{
    this.setState({ searchResult: [] })
  }
  // -------------------------------------------------------------------------------------------//
  //  functionality for the CountDown

  handleStopBtnCountDown=()=>{
    console.log('dziala')
  }


  render(){
    const{isPaused, isRunning,pausesCount}= this.state;

    const filterResults = this.state.searchResult.map((element, index)=>{
      return (
        <li key={element.id}>
        <CountDownTimer
        // key={element.id}
        onStopCountDown={this.handleStopBtnCountDown}  ////tutaj nie działa przekazanie do CountDown
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
    return(
      <div className='App'>
        <div className="layout">

          <div className="flex-left">
                <h1>Timer`s to Do Lists</h1>
                <form>
                    <input ref={this.inputFieldText} type="text" placeholder="your task for today"></input>
                    <input ref={this.inputFieldTime} type="number" placeholder="for how long"></input>
                </form>
                <button onClick={this.handlerAddTask}>Add task</button>
                <button onClick={this.handleDeleteAllTasks}>Clean tasks</button>
                <ol>
                    {
                      this.state.listTasks.map((element, index)=>{
                        return (
                          <li key={element.id}>
                            <CountDownTimer
                            // key={element.id} 
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
              <input ref={this.inputSearchValue} onChange={this.handleSearchValue} type="text" placeholder="Search.."></input>
              <button onClick={this.handleDeleteSearchTask}>Delete Tasks</button>
              <ol>{filterResults}</ol>        
             </div>


          </div>
      </div>
    )
  }
}
export default App;
