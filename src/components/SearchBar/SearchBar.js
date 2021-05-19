import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  handleText = (event) => {
    this.props.handlerSearchTask(event.target.value);
  };

  render() {
    return (
      <div className="searchBar">
        <div>
          <h3> Find your task 🔍</h3>
          <input
            type="text"
            placeholder="find your task"
            value={this.props.text}
            onChange={this.handleText}
          ></input>
          <button>Delete tasks</button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
