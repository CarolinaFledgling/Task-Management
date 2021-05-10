import React, { Component } from 'react';
import './AddTaskPanel.css'



class AddTaskPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            number: '',
        }
    }

    handleText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleTime = (e) => {
        this.setState({
            number: e.target.value
        })
    }

    // Dodawanie Tasku
    handleClickTask = () => {
        const { text, number } = this.state

        if (text.length > 2) {
            const add = this.props.addTask(text, number);
            if (add) {
                this.setState({
                    text: '',
                    number: '',
                })
            }
        } else {
            alert(' too short task !')
        }
    }


    render() {
        return (
            <div>
                <h1>-Task-Management-🔥</h1>
                <h2>What are your top tasks today?</h2>
                <form className=''>
                    <input type='text' placeholder='Add your task' value={this.state.text} onChange={this.handleText}></input>
                    <input type='number' placeholder='For how long ?' value={this.state.number} onChange={this.handleTime}></input>
                </form>
                <button onClick={this.handleClickTask}>Add your Task</button>
            </div>
        );
    }
}

export default AddTaskPanel;