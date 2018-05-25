import React from 'react';
import { widgetsOrders } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';

const Orders = () => (
  <div className="container-fluid">
    <div className="row">
      {
        widgetsOrders.map(widget => (
            <WidgetTable widget={widget} key={widget.id} />
          ))
        }
    </div>
  </div>
);
export default Orders;
