import React, { Component } from 'react';
import WidgetTable from '../Widget/WidgetTable';
import { widgetsPerformance } from '../../../localdata/dashboardWidgets';
import { initGA, logPageView } from '../../../utils/analytics';

class Performance extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
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
