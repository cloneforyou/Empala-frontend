import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import { subscribeQuotes, subscribeWatchlists, unsubscribeQuotes } from '../../../actions/dashboard';
import WatchlistsTable from '../Widget/WatchlistsTable';
import OrdersTable from '../Widget/OrdersTable';

export default class Orders extends React.Component {

  getTableDataFromOrders = (orders, title) => {
    let filteredOrders = [];
    if (title === 'Orders') {
      filteredOrders = filter(
        orders,
        order => order.status === 'Filled' || order.status === 'PartiallyFilled',
      );
    }
      if (title === 'Fills/cancels') {
        filteredOrders = filter(
          orders,
          order => order.status !== 'Filled',
        );
    }
    return filteredOrders.map(order => order.values);
  };

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

// Orders.defaultProps = {
//   ordersList: [],
//   watchLists: [],
// };
//
// export default connect(
//   state => ({
//     listNumber: state.dashboard.watchListNumber || 0,
//     ordersList: state.dashboard.parsedOrdersList,
//     userData: state.dashboard.userData,
//   }),
//   dispatch => ({
//       subscribeQuotes: () => dispatch(subscribeQuotes()),
//       unsubscribeQuotes: () => dispatch(unsubscribeQuotes()),
//       subscribeWatchlists: () => dispatch(subscribeWatchlists()),
//     }
//   ),
// )(Orders);
