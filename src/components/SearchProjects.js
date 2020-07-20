import React, { Component } from 'react';

class SearchProjects extends Component{
    render() {
        return (
            <div className="search-field">
                <input type="text" id="searchProj0" placeholder="Search Projects" onChange={e => this.props.searchProj(e.target.value)} />
            </div>
        );
    }
}

export default SearchProjects;