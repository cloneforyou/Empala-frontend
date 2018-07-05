import React from 'react';
import { connect } from 'react-redux';
import TitleBar from '../TitleBar';
import * as axios from 'axios';

const frameStyle = {
  width: '100%',
  height: '100vh',
  border: 'none',
};
//
// const ETNA = {
//   api_path: 'https://api.etnatrader.com/v4/empala_demo_prod',
//   // login: 'empalaadmin',
//   // password: 'x386505@2',
//   login: 'Iain.clarke@empala.com',
//   password: '&Tn@S0ft2',
//   private_headers: {
//     'X-API-ROUTING': 'empala_demo_prod',
//     'X-API-KEY': '6MlBcQqCm52RnoTqhuzfH2q8RNqfAvwpnOFpl259',
//   },
//   secret_question_number: 2,
// };
// const ETNA_HEADERS = {
//   'X-API-ROUTING': 'empala_demo_prod',
//   'X-API-KEY': '6MlBcQqCm52RnoTqhuzfH2q8RNqfAvwpnOFpl259',
//   'Content-Type': 'application/json',
//   'Cache-Control': 'no-cache',
//   Accept: '*/*',
// };

class MarketAccessPage extends React.Component {
  // componentDidMount() {
  //   try {
  //     const data = {
  //       device: 'iOS',
  //       version: '3.00',
  //       login: ETNA.login,
  //       password: ETNA.password,
  //     };
  //     return axios({
  //       url: `${ETNA.api_path}/login`,
  //       method: 'POST',
  //       data: JSON.stringify(data),
  //       headers: ETNA_HEADERS,
  //     });
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
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
