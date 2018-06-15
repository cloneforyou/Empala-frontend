import React from 'react';
import GoogleLogin from 'react-google-login';

const responseError = (response) => {
  console.log(response);
};

const style = {
  authButton: {
    background: '#d14836',
    height: '30px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    border: 'none',
    fontFamily: 'Proxima Nova',
  },
};

const GoogleAuth = props => (
  <GoogleLogin
    clientId="775618626283-0146i9co6rpcopbui2i78mmnc4884j32.apps.googleusercontent.com"
    // buttonText="Login"
    onSuccess={res => props.handlelogin('google', res.tokenObj.id_token)}
    onFailure={responseError}
    style={style.authButton}
  />
);

export default GoogleAuth;
