import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = (props) => {
  const tasks = props.tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      deleteTask={props.deleteTask}
      index={index}
      onStart={props.onStart}
      onStop={props.onStop}
    />
  ));
  // task={task} przepuszczamy dalej jeden pojedynczy obiekt - nasz 1 task
  return (
    <div className="taskLists">
      <h3>To do List</h3>
      <ol>{tasks}</ol>
    </div>
  );
};

export default TaskList;
