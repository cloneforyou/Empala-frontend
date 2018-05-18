import React, { Component } from 'react';
import { connect } from 'react-redux';
import Widget from './Widget';
import Footer from './Footer';
import { widgets, widgetNews } from '../../localdata/dashboardWidgets';

class Main extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { sidebarCollapsed } = this.props;
    return (
      <div className={sidebarCollapsed ? 'dashboard dashboard_light' : 'dashboard dashboard_full dashboard_light'}>
        <div className="container-fluid">
          <div className="row">
            {
              widgets.map(widget => (
                <Widget widget={widget} />
              ))
            }
            
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({}))(Main);
