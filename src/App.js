
import './App.css';
import React from 'react';




class CountDownTimer extends React.Component {

  intervalId=null;

  constructor(props){
    super(props)

    this.state={
      time: props.time,

    }
  }

  componentDidMount(){
    this.intervalId=setInterval(()=>{
        this.setState((prevState)=>{

        if (prevState.time === 1 ) {
          clearInterval(this.intervalId)
          console.log('Ding!');
        }
        return{
          time: prevState.time - 1,
        }
      })
    },1000)

  }


  componentWillUnmount(){
      clearInterval(this.intervalId)
  }

  // deleting task 
  handelDeleteTask=()=>{
    this.props.deleteTask(this.props.name)
  }


  
  key = this.props.key
  render(){
    return(
      <div>
        <p>Name of Task: {this.props.name}</p> 
        <p>Time Remaining:{this.state.time}</p>
        <button type="button" onClick={this.handelDeleteTask} style={{ display: this.props.isDeleteVisible ? "block" : "none" }}>Delete Task</button> 
      </div>
    )
  }

}

class App extends React.Component{
  constructor(props){
    super(props)

    this.inputFieldText= React.createRef();
    this.inputFieldTime= React.createRef();

    this.inputSearchValue=React.createRef();

    this.state = {
      listTasks: [],
      searchResult:[],
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
      }]
      return {
        listTasks: newListTasks,
        
      };
    });
  };

  handleDeleteTask=(name)=>{
    const filterTask= this.state.listTasks.filter((item)=>{
      return item.name !== name;
    })
    this.setState({listTasks:filterTask})
  }

  handleDeleteAllTasks=()=>{
  console.log('Moja lista',this.state.listTasks)
  return this.setState({listTasks:[]})

  }

  // Szukanie elementów 

  handleSearchValue =()=>{
    const valueOfSearchinput= this.inputSearchValue.current.value;
    console.log(valueOfSearchinput)

    // used spread operator to copy array , don`t mutate the original array 
    const newList =[...this.state.listTasks]

    const filteredItem = newList.filter((element)=>{
      return element.name.toLowerCase().includes(valueOfSearchinput.toLowerCase())
    })
    console.log("Array with filtered value", filteredItem)
    this.setState({searchResult:filteredItem})
  }

  // Delete All tasks in Seach bar 

  handleDeleteSearchTask=()=>{
    this.setState({ searchResult: [] })
  }


  render(){

    const filterResults = this.state.searchResult.map((element, isDeleteBtnVisible = false)=>{
      return (
        <li>
        <CountDownTimer isDeleteBtnVisible={isDeleteBtnVisible} name={element.name} time={element.time}/>
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
                      this.state.listTasks.map((elem)=>{
                        return (
                          <li>
                            <CountDownTimer deleteTask={this.handleDeleteTask} name={elem.name} time={elem.time} />
                          </li>
                        )                                  
                      })
                    }
                  </ol>
            </div>
              {/* Search bar */}
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
