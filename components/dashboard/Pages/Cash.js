import React from 'react';
import { widgetsCash } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';

const Cash = () => (
  <div className="container-fluid">
    <div className="row">
      {
        widgetsCash.map(widget => (
            <WidgetTable widget={widget} key={widget.id} />
          ))
        }
    </div>
  </div>
);
export default Cash;
