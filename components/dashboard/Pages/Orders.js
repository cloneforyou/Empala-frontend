import React from 'react';
import { connect } from 'react-redux';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import { getOrdersList } from '../../../actions/dashboard';



const processOrdersList = (list) => {
  return list.map(order => ({
    id: Math.random(),
    sec_name: order.Name,
    symbol: order.Symbol,
    date: new Date(parseInt(order.CreateDate.match(/\d+\+\d+/)[0], 10)).toLocaleString(),
    currency: order.SecurityCurrency,
    price: (parseFloat(order.AveragePrice) * parseInt(order.Quantity, 10)).toFixed(2),
    order_quantity: order.Quantity,
    fill_quantity: order.ExecutedQuantity,
    remain_quantity: order.LeavesQuantity,


  }));
  // return {
  //   sec_name: list.Name,
  //   symbol: list.Symbol,
  //   // date: new Date(list.CreateDate.match(/\d+\+\d+/)[0]).toLocaleString(),
  // };
};

const getTableDataFromOrders = (orders, title) => {
  console.log(orders, title)
  if (title === 'Orders') {
    console.log('ddddatatattat', processOrdersList(orders))
    return processOrdersList(orders);
  }
};

class Orders extends React.Component {
  // componentDidMount() {
  //   if (this.props.userData) this.props.getOrdersList();
  // }
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
        {this.props.ordersList && this.props.ordersList.map(order => (<p key={Math.random()}>{JSON.stringify(order)}</p>))}
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
