import React from 'react';
import { connect } from 'react-redux';
import TitleBar from '../TitleBar';
import { origin } from '../../../keys';

const getUrl = originName => (
  originName === 'prod'
    ? 'http://community.empala.com'
    : 'http://socialenginealb-949568690.us-west-2.elb.amazonaws.com'
);

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

const frameStyle = {
  width: '100%',
  height: 'calc(100vh - 200px)',
  border: 'none',
};

const GlobalNetworkPage = props => (
    <div>
      <TitleBar />
      <iframe
        src={`${getUrl(origin)}/${getUrlByPageName(props.page)}?token=${props.seToken}`}
        style={frameStyle}
        marginHeight={10}
        title="SocialEngineFrame"
      />
    </div>
);

GlobalNetworkPage.defaultProps = {
  seToken: '',
  page: 'timeline',
};

export default connect(state => (
  {
    seToken: state.dashboard.userData ? state.dashboard.userData.data.se_token : '',
  }), null)(GlobalNetworkPage);
