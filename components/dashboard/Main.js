import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overview from './Pages/Overview';
import Positions from './Pages/Positions';
import Performance from './Pages/Performance';
import Cash from './Pages/Cash'
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import Footer from './Footer';
import GlobalNetworkPage from './Pages/GlobalNetworkPage';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  mapPageToComponent = (page) => {
    switch (page) {
      case 'overview':
        return <Overview />;
      case 'positions':
        return <Positions />;
      case 'performance':
        return <Performance />;
      case 'cash':
        return <Cash />;
      case 'orders':
        return <Orders />;
      case 'timeline':
      case 'community':
      case 'groups':
      case 'blogs':
        return <GlobalNetworkPage page={page} />; // STOP TO DELETE PROPS HERE!!!! }:->
      case 'profile':
        return <Profile />;
      default:
        return '';
    }
  };

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
