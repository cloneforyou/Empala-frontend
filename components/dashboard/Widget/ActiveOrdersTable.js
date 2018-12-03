import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';


const widget = getWidgetAttributesByName('active_orders');

const parseOrdersData = data => data.filter(order => (order.status === 'PartiallyFilled' || order.status === 'New'))
  .map(order =>
    [
      { value: `${order.values.sec_name} (${order.values.symbol})` }, // 'Security & symbol'
      { value: formatNumberWithFixedPoint(order.values.price, 2) }, // 'Price'
      { value: formatNumberWithFixedPoint(order.values.order_quantity) }, // 'Qty'
      { value: formatNumberWithFixedPoint(order.values.notional_ammount) }, // 'Notional'
      { value: null }, // 'Diff %' TODO Investigate about calculation. 1point digit
    ]);

const ActiveOrdersTable = props => (
  <div
    className={`widget-col d-inline-block align-top`}
    key={widget.id}
  >
    <div
      className="widget"
      style={
        {
          height: `${widget.height}px`,
          paddingLeft: `${widget.padding_left && widget.padding_left}px`,
          paddingRight: `${widget.padding_right && widget.padding_right}px`,
        }
      }
    >
      <WidgetHead
        widget={widget}
      />
      <div>
        <EmpalaTable
          tableName="active_orders"
          tableData={parseOrdersData(props.ordersList)}
        />
      </div>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    ordersList: state.dashboard.parsedOrdersList || [],
  };
}

export default connect(mapStateToProps)(ActiveOrdersTable);

