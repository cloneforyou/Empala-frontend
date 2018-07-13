import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnyChart from 'anychart-react';
import { reduce, uniqueId } from 'lodash';
import { widgetsPositionFirst, widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import { parsePositionsList } from '../../../utils/dashboardUtils';
import { subscribeQuotes, unsubscribeQuotes } from '../../../actions/dashboard';
import PositionsTable from '../Widget/PositionsTable';
import PositionsPortfolioTable from '../Widget/PositionsPortfolioTable';

const Positions = (props) => (
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-4">
            <PositionsTable />
          </div>
          <div className="col-lg-8">
            <PositionsPortfolioTable />
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
                      series="splineArea"
                      type="area"
                      height={450}
                      splineArea={
                        [
                          [0, 8000],
                          [25, 6000],
                          [50, 12000],
                          [75, 9000],
                          [100, 5000],
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

export default Positions;
