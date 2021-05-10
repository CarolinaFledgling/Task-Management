import React from 'react';

// const Task = (props) => {
//     const { text, time } = props.task

//     handleDeleteTask=()=>{

//     }
//     return (
//         <div>
//             <h4>{text}</h4>
//             <p>Your set time: {time} min</p>
//             <button onClick={handleDeleteTask}>Delete</button>
//         </div>
//     );
// }

// export default Task;


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleDeleteTask = () => {
        this.props.deleteTask(this.props.task, this.props.index)
    }

    render() {
        const { text, time } = this.props.task
        return (

            <div>
                <h4>{text}</h4>
                <p>Your set time: {time} min</p>
                <button onClick={this.handleDeleteTask}>Delete</button>
            </div>
        );
    }
}

export default Task;
