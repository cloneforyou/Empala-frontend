import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Main from './Main';

class Body extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { sidebarCollapsed, loadingPage } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar sidebarCollapsed={sidebarCollapsed} />
          {
            !loadingPage && <Main sidebarCollapsed={sidebarCollapsed} />
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  loadingPage: state.dashboard.loadingPage,
}), {})(Body);

