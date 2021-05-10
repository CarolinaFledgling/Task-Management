import React, { Component } from 'react';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    handleText = (e) => {
        this.setState({
            text: e.target.value
        })
    }


    handlerSearchTask = () => {
        this.props.handlerSearchTask(this.state.text)
        console.log('szukaj')
    }

    render() {
        return (
            <div>
                <form>
                    <h4>Find your task 🔍</h4>
                    <input input type='text' onChange={this.handlerSearchTask} placeholder='find your task' value={this.state.text} onChange={this.handleText}></input>
                </form>
            </div>
        );
    }
}

export default SearchBar;