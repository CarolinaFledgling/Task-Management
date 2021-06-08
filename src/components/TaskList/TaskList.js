import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = (props) => {
  const tasks = props.tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      onDeleteTask={props.onDeleteTask}
      index={index}
      onStart={props.onStart}
      onStop={props.onStop}
      isStartStopVisibleinLists={props.isStartStopVisibleinTaskList}
    />
  ));

  return (
    <div className="taskLists">
      <h3 className="title-toDoList">To do List</h3>
      <ol>{tasks}</ol>
    </div>
  );
};

export default TaskList;
