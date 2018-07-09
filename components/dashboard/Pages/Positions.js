import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnyChart from 'anychart-react';
import { widgetsPositionFirst, widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import { parsePositionsList } from '../../../utils/dashboardUtils';
import { subscribeQuotes, unsubscribeQuotes } from '../../../actions/dashboard';


class Positions extends Component {
  componentDidMount() {
    this.props.subscribeQuotes();
  }
  componentWillUnmount() {
    this.props.unsubscribeQuotes();
  }
  updatePositions(positions, quotes) {
    if (positions.length > 0 && quotes) {
      return positions.map(pos => (
        quotes[pos.sec_id] ? {
          ...pos,
          m2m: quotes[pos.sec_id].Last,
          day_chg: quotes[pos.sec_id].ChangePc,
        }
        : pos
       ));
    }
    return [];
  }
  render() {
    const positions = this.updatePositions(this.props.positions, this.props.quotes);
    return (
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-4">
            {
              widgetsPositionFirst.map(widget => (
                <WidgetTable widget={widget} key={widget.id} />
              ))
            }
          </div>
          {/* For debug. TODO  Remove later. */}
          {/* {this.props.positions && this.props.positions.map(pos => (<p key={Math.random()}>{JSON.stringify(pos)}</p>))} */}
          <div className="col-lg-8">
            {
              widgetsPositions.map(widget => (
                <WidgetTable
                  widget={{
                    ...widget,
                    tables: [{
                      ...widget.tables[0],
                      data: positions,
                    }],
                  }}
                  key={widget.id}
                />
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
  }
}

Positions.defaultProps = {
  positions: [],
};

export default connect(
  state => ({
    positions: state.dashboard.parsedPositions ? state.dashboard.parsedPositions : [],
    quotes: state.dashboard.quotes,
  }),
  dispatch => ({
    subscribeQuotes: () => dispatch(subscribeQuotes()),
    unsubscribeQuotes: () => dispatch(unsubscribeQuotes()),
  }),
)(Positions);
