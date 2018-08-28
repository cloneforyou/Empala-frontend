import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import { subscribeQuotes, subscribeWatchlists, unsubscribeQuotes } from '../../../actions/dashboard';
import WatchlistsTable from '../Widget/WatchlistsTable';
import OrdersTable from '../Widget/OrdersTable';
import { initGA, logPageView } from '../../../utils/analytics';

export default class Orders extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <OrdersTable />
          <WatchlistsTable />
        </div>
        {/* For debug. TODO  Remove later. */}
        {/* {this.props.ordersList && this.props.ordersList.map(order => (<p key={Math.random()}>{JSON.stringify(order)}</p>))} */}
        {/* {this.props.watchLists && this.props.watchLists.map(list => (<p key={Math.random()}>{JSON.stringify(list)}</p>))} */}
      </div>
    );
  }
}

