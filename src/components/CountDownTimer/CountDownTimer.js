import React from 'react'

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
          <p>Name of Task: {this.props.name}</p> 
          <p>Time Remaining:{this.state.time}</p>
          <button type="button" onClick={this.handelDeleteTask} >Delete Task</button> 
        </div>
      )
    }
  
  }

  export default CountDownTimer