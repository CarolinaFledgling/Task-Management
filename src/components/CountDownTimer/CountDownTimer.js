import React from 'react'
import NameTask from '../NameTask/NameTask'
import './CountDown.css'

class CountDownTimer extends React.Component {

    static defaultProps = { isDeleteVisible: true }
    intervalId = null;

    constructor(props) {
        super(props)

        this.state = {
            time: props.time,

        }
    }

    // componentDidMount(){
    //   this.intervalId=setInterval(()=>{
    //       this.setState((prevState)=>{

    //       if (prevState.time === 1 ) {
    //         clearInterval(this.intervalId)
    //         console.log('Ding!');
    //       }
    //       return{
    //         time: prevState.time - 1,
    //       }
    //     })
    //   },1000)

    // }


    // componentWillUnmount(){
    //     clearInterval(this.intervalId)
    // }

    // deleting task 
    handelDeleteTask = () => {
        this.props.deleteTask(this.props.name, this.props.element)
    }


    // --------------------------------------------------------------------------------//
    // Handle STOP PAUSA START 

    handleStopButton = () => {
        this.props.onStopCountDown()
    }

    handleStartButton = () => {
        this.props.onStartCountDown()
    }
    handleTogglePause = () => {
        this.props.onTogglePause()
    }

    render() {
        const { isPaused, minutes, seconds, isRunning, countPausa } = this.props
        return (
            <div>
                <div className={isPaused ? 'inactive' : ''}>

                    <NameTask name={this.props.name} />
                    <p>Time Remaining: {minutes} : {seconds < 10 ? '00' : seconds}</p>
                </div>
                <button type="button" onClick={this.handleStartButton} disabled={isRunning}>Start</button>
                <button type="button" onClick={this.handleStopButton} disabled={!isRunning} >Stop</button>
                <button type="button" onClick={this.handleTogglePause} disabled={!isRunning}>{isPaused ? 'Continue' : 'Pause'} </button>
                <p>Number of breaks : {countPausa}</p>

                <button type="button" onClick={this.handelDeleteTask} >Delete Task</button>

            </div>
        )
    }

}

export default CountDownTimer