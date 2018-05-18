import React, { Component } from 'react';
import { connect } from 'react-redux';
import Widget from './Widget';
import Footer from './Footer';
import { widgets, widgetNews } from '../../localdata/dashboardWidgets';
import WidgetNews from "./Widget/WidgetNews";

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
            {
              widgetNews.map(widget => (
                <WidgetNews widget={widget} />
              ))
            }
            <div className="widget-col col-lg-5">
              <div className="widget" style={{ height: `324px` }}>
                <div className="widget__head">
                  <h3 className="widget__title">Advertisement</h3>
                </div>
                <div className="widget__body">
                  <img src="../../static/images/advertisement.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({}))(Main);
