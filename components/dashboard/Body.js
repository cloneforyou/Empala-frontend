import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Main from './Main';
import { setActivePage } from '../../actions/dashboard';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageDashboard: props.activePageDashboard || '',
    };
  }

  handleChangePage(pageLabel) {
    this.setState({ activePageDashboard: pageLabel }, () => {
      this.props.setActivePage(pageLabel);
    })
  }

  render() {
    const { sidebarCollapsed } = this.props;
    const { activePageDashboard } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar
            sidebarCollapsed={sidebarCollapsed}
            handleChangePage={(pageLabel) => this.handleChangePage(pageLabel)}
            activePageDashboard={activePageDashboard}
          />
          <Main
            sidebarCollapsed={sidebarCollapsed}
            activePageDashboard={activePageDashboard}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  activePageDashboard: state.dashboard.activePageDashboard,
}), {
  setActivePage,
})(Body);

