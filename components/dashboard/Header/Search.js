import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="col dashboard-search justify-content-left">
        <button className="dashboard-search__btn">
          <i className="dashboard-search__icon" />
        </button>
        <input
          className="form-control dashboard-search__input"
          type="text"
          placeholder="Search"
        />
      </div>
    );
  }
}

export default Search;
