import React, { Component } from 'react';
import AnyChart from 'anychart-react';
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
            <div className="widget-col col-lg-12">
              <div className="widget">
                <div className="widget__head">
                  <div className="widget__title-row">
                    <h3 className="widget__title">Stacked area chart</h3>
                  </div>
                </div>
                <div className="widget__body">
                  <div className="chart">
                    <AnyChart
                      type="area"
                      height={450}
                      data={
                        [
                          { x: "January", value: 10000 },
                          { x: "February", value: 12000 },
                          { x: "March", value: 18000 },
                          { x: "April", value: 11000 },
                          { x: "May", value: 9000 }
                        ]
                      }
                    />
                  </div>
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
