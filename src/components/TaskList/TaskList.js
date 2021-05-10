import React from 'react';
import Task from '../Task/Task';


const TaskList = (props) => {
    const tasks = props.tasks.map((task, index) => <Task key={task.id} task={task} deleteTask={props.deleteTask} index={index} />)
    // task={task} przepuszczamy dalej jeden pojedynczy obiekt - nasz 1 task 
    return (
        <div>
            <h3>Lista zadań do zrobienia</h3>
            {/* wyświetlenie pojedynczego Taska na podstawie tablicy z obiektami przekazanej z App  */}
            {tasks}
        </div>
    );
}

export default TaskList;