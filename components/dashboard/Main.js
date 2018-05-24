import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overflow from './Pages/Overflow';
import Positions from './Pages/Positions';
import Footer from './Footer';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sidebarCollapsed, activePageDashboard } = this.props;
    return (
      <div className={sidebarCollapsed ? 'dashboard dashboard_light' : 'dashboard dashboard_full dashboard_light'}>
        <div className="container-fluid">
          {
            activePageDashboard === 'overflow' ? <Overflow /> :
              activePageDashboard === 'positions' ? <Positions /> : ''
          }
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({
  activePageDashboard: state.dashboard.activePageDashboard,
}))(Main);
