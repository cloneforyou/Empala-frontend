import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from './Widget/WidgetTable';
import Footer from './Footer';
import { widgets } from '../../localdata/dashboardWidgets';

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
                <div className={`widget-col col-lg-${widget.col}`} key={widget.id}>
                  <div className={`widget widget_h-${widget.height}`}>
                    <div className="widget__head">
                      {
                        widget.icon && <i className={`widget__icon widget__icon_${widget.icon}`} />
                      }
                      <h3 className="widget__title">{widget.title}</h3>
                    </div>
                    <div className="widget__body">
                      {
                        widget.tables.map((table) => (
                          <WidgetTable table={table} key={table.id} />
                          ))}
                    </div>
                  </div>
                </div>
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
