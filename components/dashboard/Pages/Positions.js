import React, { Component } from 'react';
import { widgetsPositionFirst, widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import AnyChart from 'anychart-react';

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
            <div className="widget-col col-lg-12">
              <div className="widget">
                <div className="widget__head">
                  <div className="widget__title-row">
                    <h3 className="widget__title">Stacked area chart</h3>
                  </div>
                </div>
                <div className="widget__body">
                  <AnyChart
                    type="line"
                    data={
                      [
                        { x: 'Rouge', value: 80540 },
                        { x: 'Foundation', value: 94190 },
                        { x: 'Mascara', value: 102610 },
                        { x: 'Lip gloss', value: 110430 },
                        { x: 'Pomade', value: 128000 }
                      ]
                    }
                    title="Simple pie chart"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Positions;
