import React, { PureComponent } from "react";
import "./SearchBar.css";

class SearchBar extends PureComponent {
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
          <h3 className='title-FindTask'> Find your task 🔍</h3>
          <input
            type="text"
            placeholder="find your task"
            value={this.props.text}
            onChange={this.handleText}
          ></input>
        </div>
      </div>
    );
  }
}

export default SearchBar;
