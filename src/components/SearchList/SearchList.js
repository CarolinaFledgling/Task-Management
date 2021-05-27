import React, { PureComponent } from "react";
import "./SearchList.css";
import Task from "../Task/Task";

class SearchList extends PureComponent {
  render() {
    let { tasksSearched, onDeleteTask } = this.props;

    if (tasksSearched) {
      tasksSearched = tasksSearched.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={onDeleteTask}
          index={index}
          isDeleteBtnVisible={this.props.isDeleteBtnVisible}
        />
      ));
    }

    // task={task} przepuszczamy dalej jeden pojedynczy obiekt - nasz 1 task
    return (
      <div className="searchedList">
        {!tasksSearched ? <h2>No task found</h2> : <h2>Your found tasks</h2>}
        <ol className="taskList">{tasksSearched}</ol>
      </div>
    );
  }
}

export default SearchList;
