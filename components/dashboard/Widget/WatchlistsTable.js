import React from 'react';
import { connect } from 'react-redux';
import { widgetsWatchlists } from '../../../localdata/dashboardWidgets';
import WidgetTable from './WidgetTable';
import { subscribeQuotes, subscribeWatchlists, unsubscribeQuotes } from '../../../actions/dashboard';

class WatchlistsTable extends React.Component {
  componentDidMount() {
    this.props.subscribeQuotes();
    this.props.subscribeWatchlists();
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

  render() {
    const watchlist = this.props.watchLists.length > 0 ?
      this.updateWatchlist(this.props.watchLists[this.props.listNumber].content, this.props.quotes)
    : [];
    return (
      widgetsWatchlists.map(widget => (
        <WidgetTable
          widget={{
            ...widget,
            tables: [{
              ...widget.tables,
              data: watchlist,
            }],
          }}
          key={widget.id}
        />
      )));
  }
}

export default connect(
  state => ({
    listNumber: state.dashboard.watchListNumber || 0,
    watchLists: state.dashboard.parsedWatchLists ? state.dashboard.parsedWatchLists : [],
    userData: state.dashboard.userData,
    quotes: state.dashboard.quotes,
  }),
  dispatch => ({
    subscribeQuotes: () => dispatch(subscribeQuotes()),
    unsubscribeQuotes: () => dispatch(unsubscribeQuotes()),
    subscribeWatchlists: () => dispatch(subscribeWatchlists()),
  }),
)(WatchlistsTable);
