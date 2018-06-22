import React from 'react';
import { Button } from 'reactstrap';
import { clientsId } from '../../../utils/config';
// import Flex from './Flex';
// import LinkedInAuth from 'react-social-auth';

const isNode = require('detect-node');
const LinkedAuth = isNode ? () => (<button className="social-btn social-btn__linkedin">linkedin</button>)
  // : require('react-social-auth').LinkedInAuth;
  : require('react-linkedin-sdk').default;

if (!isNode) { console.log(require('react-linkedin-sdk')); }

const onSignIn = (authPayload) => {
  // Use the authentication payload to verify
  // the identity of the request using server
  // side authentication procedures.
  console.log(authPayload);
};

const LinkedInButton = ({ onClick }) => (
  <Button
    className="social-btn social-btn__linkedin"
    color="primary"
    onClick={onClick}
  >
    {/* <i className='fa fa-linkedin-square' /> */}
    linkedIn
  </Button>
);


export default class LinkedInLogin extends React.Component {
  // componentDidMount() {
  //   LinkedAuth = LinkedInAuth;
  // }
  render() {
    // return (
    //   <LinkedAuth
    //     appId={clientsId.linkedIn}
    //     onSuccess={onSignIn}
    //     component={LinkedInButton}
    //   />
    // );
    return (
      <LinkedAuth
        clientId={clientsId.linkedIn}
        callBack={onSignIn}
        fields=":(id,num-connections,date-of-birth,first-name,last-name,email-address)"
        className="social-btn social-btn__linkedin"
        textButton="Linkedin"
        buttonType="button"
        // icon={<Icon />}
      />
    );
  }
}
