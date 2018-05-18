import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sidebarCollapsed } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar sidebarCollapsed={sidebarCollapsed} />
          <Main sidebarCollapsed={sidebarCollapsed} />
        </div>
      </div>
    );
  }
}

export default Body;