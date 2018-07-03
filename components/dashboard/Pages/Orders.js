import React from 'react';
import { connect } from 'react-redux';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import { getOrdersList } from '../../../actions/dashboard';


/* ========= parses the date from spicified string ======== */
/* ========= like '/Date(1530076567409+0000)/' ==========  */
const parseOrderDate = str => new Date(parseInt(str.match(/\d+\+\d+/)[0], 10)).toLocaleString();

// TODO maybe will need some correction when watchlist appears
const calculateOrderDistance = (price, lastPrice) =>
  Math.abs(Math.round(((price - lastPrice) * 100) / price));

const calculateOrderPrice = (symbolPrice, quantity) =>
  (Math.round(parseFloat(symbolPrice) * parseInt(quantity, 10) * 100) / 100).toFixed(2);

const processOrdersList = list => list.map(order => ({
  id: Math.random(),
  sec_name: order.Name,
  symbol: order.Symbol,
  date: parseOrderDate(order.CreateDate),
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

const getTableDataFromOrders = (orders, title) => {
  console.log(orders, title);
  if (title === 'Orders') {
    console.log('ddddatatattat', processOrdersList(orders));
    return processOrdersList(orders);
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
              widget={{ ...widget, tables: [{ ...widget.tables[0], data: getTableDataFromOrders(this.props.ordersList, widget.title) }] }}
              key={widget.id}
            />
            ))
          }
        </div>
        {/*For debug. TODO  Remove later.*/}
        {/*{this.props.ordersList && this.props.ordersList.map(order => (<p key={Math.random()}>{JSON.stringify(order)}</p>))}*/}
      </div>
    );
  }
}

Orders.defaultProps = {
  ordersList: [],
};

export default connect(
  state => ({
    ordersList: state.dashboard.ordersList,
    userData: state.dashboard.userData,
  }),
  dispatch => ({
    getOrdersList: () => dispatch(getOrdersList()),
  }),
)(Orders);
