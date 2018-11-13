import React from 'react';
import { clientsId } from '../../../keys';

const isNode = require('detect-node');
const LinkedAuth = isNode ? () => (<button className="social-btn social-btn__linkedin">linkedin</button>)
  // : require('react-social-auth').LinkedInAuth;
  : require('react-linkedin-sdk').default;

export default class LinkedInLogin extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
  }
  onSignIn(authPayload) {
    this.props.handlelogin('linkedIn', authPayload);
  }

  componentWillMount() {
    /* Trick to fix LinkedIn SDK exeption, when use SSR. */
    /* (in some cases object 'module' appears in window scope */
    if (module.exports) module.exports = undefined;
    if (window.module && window.module.exports) window.module.exports = undefined;
  }

  render() {
    return (
      <LinkedAuth
        clientId={clientsId.linkedIn}
        callBack={this.onSignIn}
        fields=":(id,num-connections,date-of-birth,first-name,last-name,email-address,location)"
        className="social-btn social-btn__linkedin"
        textButton="linkedin"
        buttonType="button"
        lang
      />
    );
  }
}
