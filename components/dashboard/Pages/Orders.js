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
      </div>
    );
  }
}

