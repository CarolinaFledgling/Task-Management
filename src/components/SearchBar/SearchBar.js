import React, { Component } from 'react';
import './SearchBar.css'


class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    handleText = (e) => {
        this.props.handlerSearchTask(e.target.value);
    }

    render() {
        return (
            <div className='searchBar'>
                <form>
                    <h3> Find your task 🔍</h3>
                    <input
                        type='text'
                        placeholder='find your task'
                        value={this.props.text}
                        onChange={this.handleText}
                    >
                    </input>
                    <button>Delete tasks</button>
                </form>
            </div>
        );
    }
}

export default SearchBar;