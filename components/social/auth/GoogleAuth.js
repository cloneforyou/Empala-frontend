import React from 'react';
import GoogleLogin from 'react-google-login';
import { clientsId } from '../../../keys';

const responseError = response => {
};


const GoogleAuth = props => (
  <GoogleLogin
    clientId={clientsId.google}
    buttonText="google"
    onSuccess={res => props.handlelogin('google', res.tokenObj.id_token)}
    onFailure={responseError}
    className="social-btn social-btn__google"
  />
);

export default GoogleAuth;
