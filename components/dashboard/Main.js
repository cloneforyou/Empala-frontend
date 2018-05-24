import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overflow from './Pages/Overflow';
import Positions from './Pages/Positions';
import Footer from './Footer';
import { widgets, widgetNews } from '../../localdata/dashboardWidgets';
import WidgetNews from './Widget/WidgetNews';
import WidgetAdvertisement from './Widget/WidgetAdvertisement';
import GlobalNetworkPage from './Pages/GlobalNetworkPage';
import WidgetTable from "./Widget/WidgetTable";

function mapStateToProps(state) {
  return {
    activePage: state.dashboard.activePageDashboard,

  };
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.mapPageToComponent = function mapPageToComponent(page) {
      console.log(' ** PAGECHANGE', page );
      switch (page) {
        case 'timeline':
          return <GlobalNetworkPage />;
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
    const { sidebarCollapsed } = this.props;
    return (
      <div className={sidebarCollapsed ? 'dashboard dashboard_light' : 'dashboard dashboard_full dashboard_light'}>
        <div className="container-fluid">
          {this.mapPageToComponent(this.props.activePage)}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Main);
