
import './App.css';
import React from 'react';




class CountDownTimer extends React.Component {

  intervalId=null;

  constructor(props){
    super(props)

    this.state={
      counter: props.counter,

    }
  }

  componentDidMount(){
    console.log('Start Coundown', {nazwa:this.props.title})

    this.intervalId=setInterval(()=>{

      console.log('Start Timer')
     

      this.setState((prevState)=>{

        if (prevState.counter === 1 ) {
          clearInterval(this.intervalId)
          console.log('Ding!');
        }
        return{
          counter: prevState.counter - 1,
        }
      })
    },1000)

  }


  componentWillUnmount(){
      clearInterval(this.intervalId)
  }
  handelDeleteTask=()=>{
    this.props.deleteTask(this.props.title)
  }


  
  key = this.props.key
  render(){
    return(
      <div>
        <p>Name of Task: {this.props.title}</p> 
        <p>Time Remaining:{this.state.counter}</p>
        <button type="button" onClick={this.handelDeleteTask}>Delete Task</button> 
      </div>
    )
  }

}

class App extends React.Component{
  constructor(props){
    super(props)

    this.inputFieldText= React.createRef();
    this.inputFieldTime= React.createRef();

    this.state = {
      listTasks: [],
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


  render(){
    return(
      <div className='App'>
        <h1>Timer`s to Do Lists</h1>
        <form>
            <input ref={this.inputFieldText} type="text" placeholder="your task for today"></input>
            <input ref={this.inputFieldTime} type="number" placeholder="for how long"></input>
        </form>
        <button onClick={this.handlerAddTask}>Add task</button>
        <ol>
            {
              this.state.listTasks.map((elem)=>{
                return (
                  <li>
                    <CountDownTimer deleteTask={this.handleDeleteTask} title={elem.name} counter={elem.time} />
                  </li>
                )                                  
              })
            }
          </ol>
      
      </div>
    )
  }

}
export default App;
