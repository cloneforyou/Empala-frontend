import React, { Component } from 'react';
import { widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';

class Overflow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {
          widgetsPositions.map(widget => (
            <WidgetTable widget={widget} key={widget.id} />
          ))
        }

      </div>
    );
  }
}

export default Overflow;
