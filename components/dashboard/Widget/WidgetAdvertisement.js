import React, { Component } from 'react';

import WidgetDotsMenu from './WidgetDotsMenu';


class WidgetAdvertisement extends Component {
  render() {
    return (
      <div
        className="widget-col widget-col_4"
        style={{ maxWidth: '593px' }}
      >
        <div className="widget widget_padding" style={{ height: '365px' }}>
          <div className="widget__head">
            <h3 className="widget__title">Advertisements and Information</h3>
            <div className="widget-menu">
              <WidgetDotsMenu />
            </div>
          </div>
          <div className="widget-adv-img">
            <img className="" src="../../static/images/widgetAdv.jpg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default WidgetAdvertisement;