import React from 'react'
import NameTask from '../NameTask/NameTask'

class CountDownTimer extends React.Component {

    static defaultProps = {isDeleteVisible:true}
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
      this.props.deleteTask(this.props.name, this.props.element)
    }
  
    render(){
      return(
        <div>
          
          <NameTask name={this.props.name}/>
          <p>Time Remaining: {this.state.time}</p>
          <div>
            <button disabled={this.props.isRunning}>Start</button>
            <button disabled={!this.props.isRunning}>Stop</button>
            <button disabled={!this.props.isRunning}>Pauza</button>
            <p>Liczba przerw : {this.props.countPausa}</p>
          </div>
          <button type="button" onClick={this.handelDeleteTask} >Delete Task</button>
        </div>
      )
    }
  
  }

  export default CountDownTimer