import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    search() {
        this.props.onSearch(this.state.term)
    };

    handleTermChange(event) {
        this.setState({ term: event.target.value })
    };
    
    // for new feature request
    onKeyDown(event) {
        if (event.key === "Enter" || event.key === 13) {
            this.props.onSearch(this.state.term);
        }
    };

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange}
                    onKeyDown={this.onKeyDown}
                />
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;