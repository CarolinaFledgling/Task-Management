import React, { Component } from 'react';
import './Countdown.css'

class CountdownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div>
                    <p><strong>Name of you task:</strong> </p>
                    <p>Time Remaining:</p>
                    <button className='startBtn' type="button">Start</button>
                    <button className='stopBtn' type="button">Stop</button>
                </div>
            </div>
        );
    }
}

export default CountdownTimer;