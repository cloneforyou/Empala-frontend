import React, { Component } from 'react';
import { widgetsOverflow, widgetNews } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import WidgetNews from '../Widget/WidgetNews';
import WidgetAdvertisement from '../Widget/WidgetAdvertisement';

class Overflow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {
          widgetsOverflow.map(widget => (
            <WidgetTable widget={widget} key={widget.id} />
          ))
        }
        {
          widgetNews.map(widget => (
            <WidgetNews widget={widget} key={widget.id} />
          ))
        }
        <WidgetAdvertisement />
      </div>
    );
  }
}

export default Overflow;
