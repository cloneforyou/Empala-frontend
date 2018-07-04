import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import {
  parseOrdersList,
  parseWatchList,
} from '../../../utils/dashboardUtils';

const getTableDataFromOrders = (orders, title) => {
  if (title === 'Orders') {
    return parseOrdersList(filter(
      orders,
      order => order.ExecutionStatus === 'Filled' || order.ExecutionStatus === 'PartiallyFilled',
    ));
  }
};

class Orders extends React.Component {
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
                data: widget.title === 'Watchlists' ? (this.props.watchLists.length > 0 ? this.props.watchLists[this.props.listNumber].content : [])
                    : getTableDataFromOrders(this.props.ordersList, widget.title),
                }],
              }}
              key={widget.id}
            />
            ))
          }
        </div>
        {/*For debug. TODO  Remove later.*/}
        {/*{this.props.ordersList && this.props.ordersList.map(order => (<p key={Math.random()}>{JSON.stringify(order)}</p>))}*/}
        {/*{this.props.watchLists && this.props.watchLists.map(list => (<p key={Math.random()}>{JSON.stringify(list)}</p>))}*/}
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
    ordersList: state.dashboard.ordersList,
    watchLists: state.dashboard.watchLists ? state.dashboard.watchLists.map(list => parseWatchList(list)) : [],
    userData: state.dashboard.userData,
  }))(Orders);
