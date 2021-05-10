import React from 'react';

const Task = (props) => {
    const { text, time } = props.task
    return (
        <div>
            <h4>{text}</h4>
            <p>Your set time: {time} min</p>
        </div>);
}

export default Task;