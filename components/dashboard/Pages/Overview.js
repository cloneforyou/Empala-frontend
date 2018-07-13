import React, { Component } from 'react';
import { connect } from 'react-redux';
import { widgetsOverflow } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import WidgetNews from '../Widget/WidgetNews';
import WidgetAdvertisement from '../Widget/WidgetAdvertisement';
import { uniqueId } from 'lodash';

function mapStateToProps(state) {
  return {
    userData: state.dashboard.userData.data || [],
    ordersList: state.dashboard.parsedOrdersList || [],
  };
}

class Overview extends Component {
  constructor(props) {
    super(props);
  }
  mapWidgetTitleToData = title => {
    switch (title) {
      case 'Active orders':
        return this.props.ordersList.map(order => {
          // seems here might be order.status === 'PartiallyFilled'
          return order.status === 'Filled' && {
            id: uniqueId(),
            security: `${order.values.sec_name} (${order.values.symbol})`,
            price: order.values.price,
            quantity: order.values.order_quantity,
            notional: order.values.notional_ammount,
            dif: '--', // TODO Investigate about calculation
          };
        });
      default: return false;
    }

  };
  render() {
    const widgetNews = [
      {
        id: 'external_news',
        news: this.props.userData['external_news'],
      },
      {
        id: 'internal_news',
        news: this.props.userData['internal_news'],
      },
    ];
    return (
      <div className="container-fluid">
        <div className="row">
          {
            widgetsOverflow.map(widget => {
              const tableData = this.mapWidgetTitleToData(widget.title) || widget.tables[0].data;
              return (<WidgetTable
                overview
                widget={{
                  ...widget,
                  tables: [{
                    ...widget.tables[0],
                    data: tableData,
                  }],
                }}
                key={widget.id} />
            )
          })
          }
          {
            widgetNews.map(widget => (
              <WidgetNews overview widget={widget} key={widget.id} />
            ))
          }
          <WidgetAdvertisement />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Overview);
