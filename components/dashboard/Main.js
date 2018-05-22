import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from './Widget/WidgetTable';
import Footer from './Footer';
import { widgets, widgetNews } from '../../localdata/dashboardWidgets';
import WidgetNews from './Widget/WidgetNews';
import WidgetAdvertisement from './Widget/WidgetAdvertisement';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sidebarCollapsed } = this.props;
    return (
      <div className={sidebarCollapsed ? 'dashboard dashboard_dark' : 'dashboard dashboard_full dashboard_dark'}>
        <div className="container-fluid">
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({}))(Main);
