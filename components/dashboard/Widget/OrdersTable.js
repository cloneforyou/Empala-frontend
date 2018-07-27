import React from 'react';
import { connect } from 'react-redux';
import { subscribeQuotes, subscribeWatchlists, unsubscribeQuotes } from '../../../actions/dashboard';
import EmpalaTable from '../EmpalaTable';
import { formatNumberWithFixedPoint, getTableHeaderByName } from '../../../utils/dashboardUtils';
import WidgetHead from './WidgetHead';
import { filter } from 'lodash';


class OrdersTable extends React.Component {
  constructor(props) {
    super(props);
    this.widget = getTableHeaderByName('dashboard_orders');
  }
  componentDidMount() {
  }
  getTableDataFromOrders(orders, title) {
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
    /*  ===== HEADERS ==== */
    // 'Sec name'
    // 'Symbol'
    // 'Curr'
    // 'Price'
    // 'Order Q'
    // 'Fill Q'
    // 'Rem Q'
    // 'Notional'
    // 'Commision'
    // 'Distance (%)'
    // 'Start date'
    // 'O/C/T'
    /* =================== */
    return filteredOrders.map(order => [
      { value: order.values.sec_name },
      { value: order.values.symbol },
      { value: order.values.currency },
      { value: formatNumberWithFixedPoint(order.values.price, 2) },
      { value: order.values.order_quantity },
      { value: order.values.fill_quantity },
      { value: order.values.remain_quantity },
      { value: formatNumberWithFixedPoint(order.values.notional_ammount, 0) },
      { value: order.values.comission },
      { value: formatNumberWithFixedPoint(order.values.distance, 1) },
      { value: order.values.start_date },
      { value: order.values.qct },
    ]);
  }
  render() {
    const {
      widget,
      getTableDataFromOrders,
      props,
    } = this;
    return (
      <div className="w-100 px-1">
        <div
          className={`widget-col col-lg-${widget.col}`}
        >
          <div className="widget" style={{ height: `${widget.height}px` }}>
            <WidgetHead
              widget={widget}
            />
            <EmpalaTable
              tableName="dashboard_orders"
              tableData={getTableDataFromOrders(props.ordersList, 'Orders')}
              striped
            />
          </div>
        </div>
        <div
          className={`widget-col col-lg-${widget.col}`}
        >
          <div className="widget" style={{ height: `${widget.height}px` }}>
            <WidgetHead
              widget={{ ...widget, title: 'Fills/cancels' }}
            />
            <EmpalaTable
              tableName="dashboard_orders"
              tableData={getTableDataFromOrders(props.ordersList, 'Fills/cancels')}
              striped
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  ordersList: state.dashboard.parsedOrdersList,
}))(OrdersTable);
