import React from 'react';
import { connect } from 'react-redux';
import { subscribeQuotes, subscribeWatchlists, unsubscribeQuotes } from '../../../actions/dashboard';
import EmpalaTable from '../EmpalaTable';
import { formatNumberWithFixedPoint, getTableHeaderByName } from '../../../utils/dashboardUtils';
import WidgetHead from './WidgetHead';


class WatchlistsTable extends React.Component {
  constructor(props) {
    super(props);
    this.widget = getTableHeaderByName('dashboard_watchlist');
    this.listData = this.getWatchListsData(this.reduceWatchlistsToOne(this.props.watchLists));
  }
  componentDidMount() {
    this.props.subscribeQuotes();
    this.props.subscribeWatchlists();
  }

  componentWillUnmount() {
    this.props.unsubscribeQuotes();
  }

  componentWillUpdate() {
    this.listData = this.getWatchListsData(this.reduceWatchlistsToOne(this.props.watchLists));
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
    return positions;
  }
  reduceWatchlistsToOne(watchlists) {
    if (!watchlists || watchlists.length < 1) return watchlists;
    const securities = [];
    const listsContent = watchlists.map(list => list.content).reduce((prev, curr) => [...prev, ...curr]);
    return listsContent.filter((sec) => {
      if (!securities.includes(sec.secID)) {
        securities.push(sec.secID);
        return true;
      }
      return false;
    });
  }

  getWatchListsData(watchlist) {
    return watchlist && watchlist.map(list => ([
      { value: list.sec_name },
      { value: list.symbol },
      { value: 'USD' },
      { value: formatNumberWithFixedPoint(list.last_p, 2), mark: 'numeric' },
      { value: list.bid_sz },
      { value: list.bid, mark: 'numeric' },
      { value: list.off },
      { value: list.off_size },
      { value: list.day_volume },
      { value: list.sentiment },
      { value: list.esch }, // ES CH
      { value: list.pe_ratio }, // P/E ratio
      { value: list.secID },
      { value: list.rating },
    ]));
  }
  updateWatchlistData(positions, quotes) {
    if (positions && quotes) {
      positions.forEach((pos) => {
        const secId = pos[12].value;
        if (quotes[secId]) {
          pos[3].value = formatNumberWithFixedPoint(quotes[secId].Last, 2);
          pos[4].value = formatNumberWithFixedPoint(quotes[secId].BidSize);
          pos[5].value = formatNumberWithFixedPoint(quotes[secId].Bid, 2);
          pos[8].value = formatNumberWithFixedPoint(quotes[secId].TotalDailyVolume);
        }
      });
    }
    return positions;
  }


  render() {
    const {
      widget,
      props,
      updateWatchlistData,
      listData,
    } = this;

    /*    will be useful if client will decide return to several watchlists
    const watchlistData = props.watchLists[props.listNumber] &&
      updateWatchlistData(getWatchListsData(props.watchLists[props.listNumber].content), props.quotes);
    */

    const watchlistData = updateWatchlistData(listData, props.quotes);
    return (
      <div className="w-100 px-1">
        <div
          className={`widget-col col-lg-${widget.col} `}
          key={widget.id}
        >
          <div className="widget" style={{ height: '488px' }}>
            <WidgetHead
              widget={widget}
            />
            <EmpalaTable
              tableName="dashboard_watchlist"
              tableData={watchlistData}
              striped
            />
          </div>
        </div>
      </div>
    );
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
