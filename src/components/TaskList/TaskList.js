import React from 'react';
import Task from '../Task/Task';


const TaskList = () => {
    return (
        <div>
            <h3>Lista zadań</h3>
            <Task />
            <Task />
            <Task />
        </div>
    );
}

export default TaskList;