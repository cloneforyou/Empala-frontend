import React, { Component } from 'react';
import { connect } from 'react-redux';
import { widgetsOverflow } from '../../../localdata/dashboardWidgets';
import WidgetTable from '../Widget/WidgetTable';
import WidgetNews from '../Widget/WidgetNews';
import WidgetAdvertisement from '../Widget/WidgetAdvertisement';

function mapStateToProps(state) {
  return {
    userData: state.dashboard.userData.data || [],
  };
}

class Overview extends Component {
  constructor(props) {
    super(props);
  }

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
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Overview);
