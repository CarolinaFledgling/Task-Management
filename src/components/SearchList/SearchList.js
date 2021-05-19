import React from "react";
import "./SearchList.css";
import Task from "../Task/Task";

const SearchList = (props) => {
  const tasksSearched = props.tasksSearched.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      deleteTask={props.deleteTask}
      index={index}
      isDeleteBtnVisible={false}
    />
  ));

  //Dlaczego nie działa u mnie ta destrukturyzacja , widze ze bład w zapisie ale gdzie ?
  // const SearchList = ({ tasksSearched, deleteTask }) => {
  //   const tasksSearched = tasksSearched.map((task, index) => (
  //     <Task
  //       key={task.id}
  //       task={task}
  //       deleteTask={deleteTask}
  //       index={index}
  //       isDeleteBtnVisible={false}
  //     />
  //   ));

  // task={task} przepuszczamy dalej jeden pojedynczy obiekt - nasz 1 task
  return (
    <div className="searchedList">
      <h2>Your found tasks</h2>
      <ol className="taskList">{tasksSearched}</ol>
    </div>
  );
};

export default SearchList;
