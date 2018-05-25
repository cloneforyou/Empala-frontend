import React  from 'react';
import TitleBar from '../TitleBar';

function getUrlByPageName(pageName) {
  switch (pageName) {
    case 'timeline':
      return '';
    case 'community':
      return 'members';
    case 'blogs':
      return 'blogs';
    case 'groups':
      return 'groups';
    default:
      return '';
  }
}

const frameStyle = { width: '100%',
  height: '100vh',
  border: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
    },
  }

const GlobalNetworkPage = (props) => {
  return(
  <div>
    <TitleBar />
    <iframe
      src={`http://socialenginealb-949568690.us-west-2.elb.amazonaws.com/${getUrlByPageName(props.page)}`}
      style={frameStyle}
      marginHeight={10}
      />
  </div>
  )
}

export default GlobalNetworkPage;
