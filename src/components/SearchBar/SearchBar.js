import React, { Component } from 'react';


class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    handleText = (e) => {
        this.props.handlerSearchTask(e.target.value);
    }

    render() {
        return (
            <div>
                <form>
                    <h4>Find your task 🔍</h4>
                    <input
                        type='text'
                        placeholder='find your task'
                        value={this.props.text}
                        onChange={this.handleText}
                    >
                    </input>
                </form>
            </div>
        );
    }
}

export default SearchBar;