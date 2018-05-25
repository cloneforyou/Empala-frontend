import React, { Component } from 'react';
import WidgetTable from '../Widget/WidgetTable';
import { widgetsPerformance } from '../../../localdata/dashboardWidgets';

class Performance extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {
            widgetsPerformance.map(widget => (
              <WidgetTable widget={widget} key={widget.id} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Performance;
