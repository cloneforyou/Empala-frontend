import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from './WidgetTable';
import Footer from './Footer'
import { widgets } from '../../localdata/dashboardWidgets';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderTables = () => {
    widgetFinancialCapital.tables.map((table, index) => {
      return (<WidgetTable table={table} key={index}/>)
    })
  }

  render() {
    const { sidebarCollapsed } = this.props;
    return (
      <div className={sidebarCollapsed ? 'dashboard dashboard_light' : 'dashboard dashboard_full dashboard_light'}>
        <div className="container-fluid">
          <div className="row">
            {
              widgets.map((widget) => (
                <div className={`col-md-${widget.col}`}>
                  <div className="widget">
                    <div className="widget__head">
                      <h3 className="widget__title">{widget.title}</h3>
                    </div>
                    <div className="widget__body">
                      {
                        widget.tables.map((table, index) => (
                            <WidgetTable table={table} key={index}/>
                          )
                        )}
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect(state => ({}))(Main);
