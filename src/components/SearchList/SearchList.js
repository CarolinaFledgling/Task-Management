import React from 'react';
import './SearchList.css'
import Task from '../Task/Task';


const SearchList = (props) => {
    const tasksSearched = props.tasksSearched.map((task, index) => <Task key={task.id} task={task} deleteTask={props.deleteTask} index={index} />)
    // task={task} przepuszczamy dalej jeden pojedynczy obiekt - nasz 1 task 
    return (
        <div className='searchedList'>
            <h3>Your found tasks</h3>
            <ol className='taskList'>{tasksSearched}</ol>
        </div>
    );
}

export default SearchList;