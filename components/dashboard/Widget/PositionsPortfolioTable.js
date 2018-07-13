import React from 'react';
import { connect } from 'react-redux';
import { reduce, uniqueId } from 'lodash';
import { widgetsPositions } from '../../../localdata/dashboardWidgets';
import WidgetTable from './WidgetTable';
import { subscribeQuotes, unsubscribeQuotes } from '../../../actions/dashboard';

const updatePositionsPortfolio = (positions, quotes) => {
  if (positions.length > 0 && quotes) {
    return positions.map(pos => (
      quotes[pos.sec_id] ? {
        ...pos,
        m2m: quotes[pos.sec_id].Last,
        day_chg: quotes[pos.sec_id].ChangePc,
        notional: (pos.quantity * quotes[pos.sec_id].Last).toFixed(2),
        total_chg: ((quotes[pos.sec_id].Last - pos.avg_price) * 100 / pos.avg_price).toFixed(2),
      }
        : pos
    ));
  }
  return [];
};

class PositionsPortfolioTable extends React.Component {
  componentDidMount() {
    this.props.subscribeQuotes();
  }
  componentWillUnmount() {
    this.props.unsubscribeQuotes();
  }
  render() {
    return (
      widgetsPositions.map(widget => (
        <WidgetTable
          widget={{
            ...widget,
            tables: [{
              ...widget.tables[0],
              data: updatePositionsPortfolio(this.props.positionsParsed, this.props.quotes),
            }],
          }}
          key={widget.id}
        />
      )));
  }
}

export default connect(
  state => ({
    positionsParsed: state.dashboard.parsedPositions ? state.dashboard.parsedPositions : [],
    quotes: state.dashboard.quotes,
  }),
  dispatch => ({
    subscribeQuotes: () => dispatch(subscribeQuotes()),
    unsubscribeQuotes: () => dispatch(unsubscribeQuotes()),
  }),
)(PositionsPortfolioTable);
