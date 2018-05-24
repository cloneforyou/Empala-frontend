import React  from 'react';
import TitleBar from '../TitleBar';

const GlobalNetworkPage = (props) => {
  return(
  <div>
    <TitleBar />
    <iframe
      src="http://socialenginealb-949568690.us-west-2.elb.amazonaws.com"
      style={{ width: '100%', height: '100vh' }}
      marginHeight={10}
      />
  </div>
  )
}

export default GlobalNetworkPage;
