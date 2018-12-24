import React from 'react';

import Icons from '../../../constants/Icons';
import DashboardIcon from '../DashboardIcon';


const Search = () => (
  <div className="col dashboard-search justify-content-left">
    <button className="dashboard-search__btn">
      <DashboardIcon
        name={Icons.iconSearch.id}
        viewBox={Icons.iconSearch.viewBox}
        className="dashboard-search__icon"
      />
    </button>
    <input
      className="form-control dashboard-search__input"
      type="text"
      placeholder="Search"
    />
  </div>
);

export default Search;
