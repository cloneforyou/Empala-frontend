import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { widgetsOverflow } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import WidgetNews from '../Widget/WidgetNews';
import WidgetAdvertisement from '../Widget/WidgetAdvertisement';
import { parsePositionsTablesData } from '../Widget/PositionsTable';
import FinancialCapitalTable from '../Widget/FinancialCapitalTable';
import SocialCapitalTable from '../Widget/SocialCapitalTable';
import EnvironmentalCapitalTable from '../Widget/EnvironmentalCapitalTable';
import ActiveOrdersTable from '../Widget/ActiveOrdersTable';
import WorkingDealsTable from '../Widget/WorkingDealsTable';
import DealDevelopmentTable from '../Widget/DealDevelopmentTable';

function mapStateToProps(state) {
  return {
    userData: state.dashboard.userData.data || [],
    userDataLoaded: state.dashboard.userDataLoaded,
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
    const widgetsWidth = ['630px', '495px','595px'];
    if (this.props.userDataLoaded) {
      return (
        <div className="container-fluid" >
        <div style={{overflowX: 'auto'}}> {/* Temporary solution. todo widgets responsive layout */}
          <div style={{width: '1736px'}}>
            <FinancialCapitalTable />
            <SocialCapitalTable />
            <EnvironmentalCapitalTable />
          </div>
        </div>

              <div style={{overflowX: 'auto'}}> {/* Temporary solution. todo widgets responsive layout */}
                <div style={{width: '1736px'}}>
            <ActiveOrdersTable />
            <WorkingDealsTable />
            <DealDevelopmentTable />
                </div>
              </div>
            <div className="row">
            {
              widgetNews.map((widget, i) => (
                <WidgetNews
                  overview
                  widget={widget}
                  key={widget.id}
                  maxWidth={widgetsWidth[i]}
                />
              ))
            }
            <WidgetAdvertisement />
          </div>
        </div>
      );
    }
    return <h2>Error while loading user data</h2>
  }
}

export default connect(mapStateToProps, null)(Overview);
