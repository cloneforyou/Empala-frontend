import React, { Component } from 'react';
import { connect } from 'react-redux';
import { widgetsOverflow } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import WidgetNews from '../Widget/WidgetNews';
import WidgetAdvertisement from '../Widget/WidgetAdvertisement';
import { uniqueId } from 'lodash';
import FinancialCapitalTable from '../Widget/FinancialCapitalTable';
import { parsePositionsTablesData } from '../Widget/PositionsTable';
import SocialCapitalTable from '../Widget/SocialCapitalTable';

function mapStateToProps(state) {
  return {
    userData: state.dashboard.userData.data || [],
    ordersList: state.dashboard.parsedOrdersList || [],
    positions: state.dashboard.positions ? state.dashboard.positions : [],
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
    console.log('------->>>>>>', parsePositionsTablesData(widgetsOverflow[0].tables, this.props.positions))
    return (
      <div className="container-fluid">
        <div className="row">
          <FinancialCapitalTable />
          <SocialCapitalTable />
          {/*<WidgetTable*/}
            {/*overview*/}
            {/*widget={{ ...widgetsOverflow[0],*/}
              {/*tables: parsePositionsTablesData(widgetsOverflow[0].tables, this.props.positions)*/}
            {/*}}*/}

          {/*/>*/}
          {
            widgetsOverflow.slice(2).map(widget => {
              const tableData = this.mapWidgetTitleToData(widget.title) || widget.tables[0].data;
              return (<WidgetTable
              overview
              widget={{
              ...widget,
                  tables: [{
                  ...widget.tables[0],
                  data: tableData,
                }, ...widget.tables.slice(1)],
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
