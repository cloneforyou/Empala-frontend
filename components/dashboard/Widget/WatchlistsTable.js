import React from 'react';
import { connect } from 'react-redux';
import { subscribeQuotes, subscribeWatchlists, unsubscribeQuotes } from '../../../actions/dashboard';
import EmpalaTable from '../EmpalaTable';
import { getTableHeaderByName } from '../../../utils/dashboardUtils';
import WidgetHead from './WidgetHead';


class WatchlistsTable extends React.Component {
  constructor(props) {
    super(props);
    this.widget = getTableHeaderByName('dashboard_watchlist');
  }
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
    return positions;
  }

  getWatchListsData(watchlist) {
    return watchlist && watchlist.map(list => ([
      { value: list.sec_name },
      { value: list.symbol },
      { value: 'USD' },
      { value: list.last_p, mark: 'numeric' },
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
          pos[3].value = quotes[secId].Last;
          pos[4].value = quotes[secId].BidSize;
          pos[5].value = quotes[secId].Bid;
          pos[8].value = quotes[secId].TotalDailyVolume;
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
      getWatchListsData,
    } = this;
    const watchlistData = props.watchLists[props.listNumber] &&
      updateWatchlistData(getWatchListsData(props.watchLists[props.listNumber].content), props.quotes);
    // console.log(watchlistData[0])
    return (
      <div className="w-100 px-1">
        <div
          className={`widget-col col-lg-${widget.col} `}
          key={widget.id}
        >
          <div className="widget" style={{ height: `${widget.height}px` }}>
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
