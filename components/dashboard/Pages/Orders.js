import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import { getOrdersList } from '../../../actions/dashboard';


/* ========= parses the date from specified string ======== */
/* ========= like '/Date(1530076567409+0000)/' ==========  */
const parseOrderDate = str => {console.log(str); return new Date(parseInt(str.match(/\d+(\+\d+)?/)[0], 10)).toLocaleString()};

// TODO maybe will need some correction when watchlist appears
const calculateOrderDistance = (price, lastPrice) =>
  Math.abs(Math.round(((price - lastPrice) * 100) / price));

const calculateOrderPrice = (symbolPrice, quantity) =>
  (Math.round(parseFloat(symbolPrice) * parseInt(quantity, 10) * 100) / 100).toFixed(2);

const processOrdersList = list => list.map(order => ({
  id: Math.random(),
  // sec_name: order.Name,
  sec_name: order.SymbolDescription,
  symbol: order.Symbol,
  // date: parseOrderDate(order.Date),
  currency: order.SecurityCurrency,
  price: calculateOrderPrice(order.AveragePrice, order.Quantity),
  order_quantity: order.Quantity,
  fill_quantity: order.ExecutedQuantity,
  remain_quantity: order.LeavesQuantity,
  notional_ammount: '--', // TODO find the way how to calculate
  comission: '--', // TODO find the way how to calculate
  distance: calculateOrderDistance(order.AveragePrice, order.LastPrice),
  start_date: parseOrderDate(order.CreateDate),
  qct: '--', // TODO Investigate how to calculate

}));

const processWatchList = list => ({
  id: list.Id,
  name: list.Name,
  type: list.Type,
  content: list.SecurityList.map(position => (
    {
      id: Math.random(),
      sec_name: position.Description,
      symbol: position.Symbol,
      // date: parseOrderDate(position.AddedDate),
      currency: position.Currency,
      last_p: '--', // TODO where could be find
      bid_sz: '--', // TODO where could be find
      bid: '--', // TODO where could be find
      off: '--', // TODO where could be find,
      off_size: position.ContractSize, // not sure about this
      day_volume: '--', // TODO where could be find,
      sentiment: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      esch: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      pe_ratio: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      secID: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      rating: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
    }
  )),
});

const getTableDataFromOrders = (orders, title) => {
  console.log(orders, title);
  if (title === 'Orders') {
    return processOrdersList(filter(
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
};

export default connect(
  state => ({
    listNumber: state.dashboard.watchListNumber || 0,
    ordersList: state.dashboard.ordersList,
    watchLists: state.dashboard.watchLists ? state.dashboard.watchLists.map(list => processWatchList(list)) : [],
    userData: state.dashboard.userData,
  }),
  dispatch => ({
    getOrdersList: () => dispatch(getOrdersList()),
  }),
)(Orders);
