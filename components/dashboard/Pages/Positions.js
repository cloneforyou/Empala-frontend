import React, { Component } from 'react';
import { widgetsPositionFirst, widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';

class Positions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-md-5">
            {
              widgetsPositionFirst.map(widget => (
                <WidgetTable widget={widget} key={widget.id} />
              ))
            }
          </div>
          <div className="col-md-7">
            {
              widgetsPositions.map(widget => (
                <WidgetTable widget={widget} key={widget.id} />
              ))
            }
          </div>


        </div>
      </div>

    );
  }
}

export default Positions;
