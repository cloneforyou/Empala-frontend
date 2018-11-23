import React from 'react';
import { connect } from 'react-redux';
import TitleBar from '../TitleBar';
import * as axios from 'axios';

const frameStyle = {
  width: '100%',
  height: '100vh',
  border: 'none',
};

class MarketAccessPage extends React.Component {

  render() {
    if (this.props.activePageMarket === 'united states') {
      return (
        <div>
          <TitleBar/>
          <iframe
            src="https://papertrading.empala.com/UserSecurity"
            style={frameStyle}
            marginHeight={10}
            title="MarketsFrame"
          />
        </div>
      );
    }
    return (<h2 style={{ color: 'silver', fontSize: 120 }}>Coming soon</h2>);
  }
}

MarketAccessPage.defaultProps = {
  etnaCredentials: {},
  page: 'timeline',
};

export default connect(state => (
  {
    etnaCredentials: state.dashboard.userData.data.etna_credentials || {},
    activePageMarket: state.dashboard.activePageMarket,
  }), null)(MarketAccessPage);
