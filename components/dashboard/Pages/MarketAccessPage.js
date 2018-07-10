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
    return (
      <div>
        <TitleBar />
        <iframe
          src="https://empala-demo-prod.etnasoft.us/"
          style={frameStyle}
          marginHeight={10}
          title="MarketsFrame"
        />
      </div>
    );
  }
}

MarketAccessPage.defaultProps = {
  etnaCredentials: {},
  page: 'timeline',
};

export default connect(state => (
  {
    etnaCredentials: state.dashboard.userData.data.etna_credentials || {},
  }), null)(MarketAccessPage);