import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from './Widget/WidgetTable';
import Footer from './Footer';
import { widgets, widgetNews } from '../../localdata/dashboardWidgets';
import WidgetNews from './Widget/WidgetNews';
import WidgetAdvertisement from './Widget/WidgetAdvertisement';
import GlobalNetworkPage from './Pages/GlobalNetworkPage';

function mapStateToProps(state) {
  return {
    currentPage: state.dashboard.currentPage || 'widgets',
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
        default:
          return (
            <div className="row">
              {
                widgets.map(widget => (
                  <WidgetTable widget={widget} key={widget.id} />
                ))
              }
              {
                widgetNews.map(widget => (
                  <WidgetNews widget={widget} key={widget.id} />
                ))
              }
              <WidgetAdvertisement />
            </div>
          );
      }
    };
  }

  render() {
    const { sidebarCollapsed } = this.props;
    return (
      <div className={sidebarCollapsed ? 'dashboard dashboard_light' : 'dashboard dashboard_full dashboard_light'}>
        <div className="container-fluid">
          {this.mapPageToComponent(this.props.currentPage)}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Main);
