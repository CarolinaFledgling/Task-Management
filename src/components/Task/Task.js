import React from 'react';
import './Task.css'

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

    static defaultProps = { isDeleteBtnVisible: true }
    constructor(props) {
        super(props);

    }

    handleDeleteTask = () => {
        this.props.deleteTask(this.props.task, this.props.index)
    }

    render() {
        const { text, time } = this.props.task
        return (

            <li className='item'>
                <h3> {text}</h3>
                <p>Your set time: {time} min</p>
                <button style={{ display: this.props.isDeleteBtnVisible ? "block" : "none" }} onClick={this.handleDeleteTask}>Delete</button>
            </li>
        );
    }
}

export default Task;
