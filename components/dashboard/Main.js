import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overflow from './Pages/Overflow';
import Positions from './Pages/Positions';
import Performance from './Pages/Performance';
import Footer from './Footer';
import { widgets, widgetNews } from '../../localdata/dashboardWidgets';
import GlobalNetworkPage from './Pages/GlobalNetworkPage';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  mapPageToComponent = (page) => {
    switch (page) {
      case 'overflow':
        return <Overflow />;
      case 'positions':
        return <Positions />;
      case 'timeline':
      case 'community':
      case 'groups':
      case 'blogs':
        return <GlobalNetworkPage />;
      case 'performance':
        return <Performance />
      default:
        return ''
    }
  }

  render() {
    const { sidebarCollapsed, activePageDashboard } = this.props;
    return (
      <div className={sidebarCollapsed ? 'dashboard dashboard_light' : 'dashboard dashboard_full dashboard_light'}>
        <div className="container-fluid">
          {this.mapPageToComponent(activePageDashboard)}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({
  activePageDashboard: state.dashboard.activePageDashboard,
}))(Main);
