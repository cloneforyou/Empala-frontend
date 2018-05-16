import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetTable from './WidgetTable';
import { widgetFinancialCapital } from '../../localdata/dashboardWidgets';

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
            <div className="col-5">
              <div className="widget">
                <div className="widget__head">
                  <h3 className="widget__title">{widgetFinancialCapital.title}</h3>
                </div>
                <div className="widget__body">
                  {
                    widgetFinancialCapital.tables.map((table, index) => (
                        <WidgetTable table={table} key={index}/>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({}))(Main);
