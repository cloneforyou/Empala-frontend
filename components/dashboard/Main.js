import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overflow from './Pages/Overflow';
import Positions from './Pages/Positions';
import Performance from './Pages/Performance';
import Cash from './Pages/Cash'
import Orders from "./Pages/Orders";
import Footer from './Footer';
import { widgets } from '../../localdata/dashboardWidgets';
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
      case 'cash':
        return <Cash />;
      case 'orders':
        return <Orders />;
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
        {this.mapPageToComponent(activePageDashboard)}
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({
  activePageDashboard: state.dashboard.activePageDashboard,
}))(Main);
