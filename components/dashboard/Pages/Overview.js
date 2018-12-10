import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import WidgetNews from '../Widget/WidgetNews';
import WidgetAdvertisement from '../Widget/WidgetAdvertisement';
import FinancialCapitalTable from '../Widget/FinancialCapitalTable';
import SocialCapitalTable from '../Widget/SocialCapitalTable';
import EnvironmentalCapitalTable from '../Widget/EnvironmentalCapitalTable';
import ActiveOrdersTable from '../Widget/ActiveOrdersTable';
import WorkingDealsTable from '../Widget/WorkingDealsTable';
import DealDevelopmentTable from '../Widget/DealDevelopmentTable';
import { initGA, logPageView } from '../../../utils/analytics';

function mapStateToProps(state) {
  return {
    userData: state.dashboard.userData.data || [],
    userDataLoaded: state.dashboard.userDataLoaded,
    ordersList: state.dashboard.parsedOrdersList || [],
    positions: state.dashboard.positions ? state.dashboard.positions : [],
    externalNews: state.dashboard.externalNews,
  };
}

class Overview extends PureComponent {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  renderThumbHorizontal = (props) => {
    return (
      <div {...props} className="widgets-row__scroll-block-thumb-horizontal" />
    );
  };

  render() {
    const widgetNews = [
      {
        id: 'external_news',
        news: this.props.externalNews,
      },
      {
        id: 'internal_news',
        news: this.props.userData.internal_news,
      },
    ];
    const widgetsWidth = ['630px', '495px'];
    if (this.props.userDataLoaded) {
      return (
        <div className="container-fluid" style={{ marginBottom: '60px' }}>
          {/* Temporary solution. todo widgets responsive layout */}
          <Scrollbars
            className="widgets-row"
            renderThumbHorizontal={this.renderThumbHorizontal}
            style={{height: '400px'}}
            universal
          >
            <div style={{width: '1732px'}}>
              <FinancialCapitalTable />
              <SocialCapitalTable />
              <EnvironmentalCapitalTable />
            </div>
          </Scrollbars>

          {/* Temporary solution. todo widgets responsive layout */}
          <Scrollbars
            className="widgets-row"
            renderThumbHorizontal={this.renderThumbHorizontal}
            style={{height: '300px'}}
            universal
          >
            <div style={{width: '1732px'}}>
              <ActiveOrdersTable />
              <WorkingDealsTable />
              <DealDevelopmentTable />
            </div>
          </Scrollbars>
          <div className="d-flex justify-content-center">
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
    return <h2>Error while loading user data</h2>;
  }
}

export default connect(mapStateToProps, null)(Overview);
