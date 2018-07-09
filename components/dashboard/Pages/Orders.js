import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import {
  parseOrdersList,
  parseWatchList,
} from '../../../utils/dashboardUtils';
import { subscribeQuotes, unsubscribeQuotes } from '../../../actions/dashboard';

const getTableDataFromOrders = (orders, title) => {
  if (title === 'Orders') {
    const filteredOrders = filter(
      orders,
      order => order.status === 'Filled' || order.ExecutionStatus === 'PartiallyFilled',
    );
    return filteredOrders.map(order => order.values);
  }
};

class Orders extends React.Component {
  componentDidMount() {
    this.props.subscribeQuotes();
  }
  componentWillUnmount() {
    this.props.unsubscribeQuotes();
  }
  updateWatchlist(positions, quotes) {
    if (positions.length > 0 && quotes) {
      return positions.map(pos => (
        quotes[pos.secID] ? {
          ...pos,
          last_p: quotes[pos.secID].Last,
          bid_sz: quotes[pos.secID].BidSize,
          bid: quotes[pos.secID].Bid,
          day_volume: quotes[pos.secID].TotalDailyVolume,
        }
          : pos
      ));
    }
    return [];
  }
  getDataForTableByTableTitle(title) {
    if (title === 'Watchlists') {
      return this.props.watchLists.length > 0 ?
        this.updateWatchlist(this.props.watchLists[this.props.listNumber].content, this.props.quotes)
        : [];
    }
    return getTableDataFromOrders(this.props.ordersList, title);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.props.ordersList &&
          widgetsOrders.map(widget => (
            <WidgetTable
              widget={{
                ...widget,
                tables: [{
                ...widget.tables[0],
                data: this.getDataForTableByTableTitle(widget.title),
                }],
              }}
              key={widget.id}
            />
            ))
          }
        </div>
        {/* For debug. TODO  Remove later. */}
        {/* {this.props.ordersList && this.props.ordersList.map(order => (<p key={Math.random()}>{JSON.stringify(order)}</p>))} */}
        {/* {this.props.watchLists && this.props.watchLists.map(list => (<p key={Math.random()}>{JSON.stringify(list)}</p>))} */}
      </div>
    );
  }
}

Orders.defaultProps = {
  ordersList: [],
  watchLists: [],
};

export default connect(
  state => ({
    listNumber: state.dashboard.watchListNumber || 0,
    ordersList: state.dashboard.parsedOrdersList,
    watchLists: state.dashboard.parsedWatchLists ? state.dashboard.parsedWatchLists : [],
    userData: state.dashboard.userData,
    quotes: state.dashboard.quotes,
  }),
  dispatch => ({
    subscribeQuotes: () => dispatch(subscribeQuotes()),
    unsubscribeQuotes: () => dispatch(unsubscribeQuotes()),
  }
  ),
)(Orders);
