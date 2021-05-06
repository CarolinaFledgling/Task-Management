
import React, { Component } from 'react';
//imrc

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <input ref={this.inputSearchValue} onChange={this.handleSearchValue} type="text" placeholder="Search.."></input>
                <button onClick={this.handleDeleteSearchTask}>Delete Tasks</button>
                <ol>{this.props.filterResults}</ol>
            </div>
        );
    }
}

export default SearchBar;