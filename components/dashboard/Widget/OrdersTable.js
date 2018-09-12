import React from 'react';
import { connect } from 'react-redux';
import { subscribeQuotes, subscribeWatchlists, unsubscribeQuotes } from '../../../actions/dashboard';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getTableHeaderByName,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';
import WidgetHead from './WidgetHead';
import { filter } from 'lodash';


class OrdersTable extends React.Component {
  constructor(props) {
    super(props);
    this.widgetOrders = getWidgetAttributesByName('dashboard_orders');
    this.widgetFills = getWidgetAttributesByName('dashboard_fills');
  }
  componentDidMount() {
  }
  getTableDataFromOrders(orders, title) {
    const orders_statuses = [
      'New',
      'PartiallyFilled',
      'DoneForDay',
      'Replaced',
      'Suspended',
      'PendingNew',
      'Calculated',
      'AcceptedForBidding',
      'Error',
    ];
    const fills_cancels_statuses = [
      'Filled',
      'Canceled',
      'Stopped',
      'Rejected',
      'Expired',
    ];
    let filteredOrders = [];
    if (title === 'Orders') {
      filteredOrders = filter(
        orders,
        // order => order.status === 'New' || order.status === 'PartiallyFilled',
        order => orders_statuses.includes(order.status),
      );
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
        { value: formatNumberWithFixedPoint(order.values.notional_ammount, 1) },
        { value: order.values.comission },
        { value: formatNumberWithFixedPoint(order.values.distance, 1) },
        { value: order.values.start_date },
        { value: order.values.qct },
      ]);
    }
    if (title === 'Fills/cancels') {
      filteredOrders = filter(
        orders,
        // order => order.status === 'Filled' || order.status === 'Canceled',
        order => fills_cancels_statuses.includes(order.status),
      );
      return filteredOrders.map(order => [
        { value: order.values.sec_name },
        { value: order.values.symbol },
        { value: order.values.currency },
        { value: formatNumberWithFixedPoint(order.values.price, 2) },
        { value: order.values.order_quantity, color: order.values.order_quantity > 0 ? 'green' : 'red' },
        { value: order.values.fill_quantity },
        { value: formatNumberWithFixedPoint(order.values.notional_ammount, 1) }, // Notional
        { value: '--' }, // Exec fees
        { value: '--' }, // Reg fees
        { value: formatNumberWithFixedPoint(order.values.fill_quantity * order.values.price, 2) }, // $ proceeds
        { value: order.values.start_date },
        { value: order.values.qct },
      ]);
    }
  }
  render() {
    const {
      widgetOrders,
      widgetFills,
      getTableDataFromOrders,
      props,
    } = this;
    return (
      <div className="w-100 px-1">
        <div
          className={`widget-col col-lg-${widgetOrders.col}`}
        >
          <div className="widget" style={{ height: `${widgetOrders.height}px` }}>
            <WidgetHead
              widget={widgetOrders}
            />
            <EmpalaTable
              tableName="dashboard_orders"
              tableData={getTableDataFromOrders(props.ordersList, 'Orders')}
              striped
            />
          </div>
        </div>
        <div
          className={`widget-col col-lg-${widgetFills.col}`}
        >
          <div className="widget" style={{ height: `${widgetFills.height}px` }}>
            <WidgetHead
              widget={widgetFills}
            />
            <EmpalaTable
              tableName="dashboard_fills"
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
