import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overflow from './Pages/Overflow';
import Positions from './Pages/Positions';
import Footer from './Footer';
import { widgets, widgetNews } from '../../localdata/dashboardWidgets';
import GlobalNetworkPage from './Pages/GlobalNetworkPage';

class Main extends Component {
  constructor(props) {
    super(props);


    this.mapPageToComponent = function mapPageToComponent(pageName) {
      switch (pageName) {
        case 'timeline':
        case 'community':
        case 'groups':
        case 'blogs':
          return <GlobalNetworkPage page={pageName} />;
        case 'overflow':
          return <Overflow />;
        case 'positions':
          return <Positions />;
        default:
          return <Overflow />;
      }
    };
  }

  render() {
    const { sidebarCollapsed, activePageDashboard } = this.props;
    console.log('activePage -==> ', activePageDashboard);
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
