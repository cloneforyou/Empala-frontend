import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { clientsId } from '../../../keys';

const responseFacebook = (response) => {
  if (!response) return false;
  if (response.error) {
    console.log(response.error.message);
    return false;
  }
  return response;
};

const FacebookAuth = props => (
  <FacebookLogin
    appId={clientsId.faceBook}
    scope="public_profile, email, user_birthday, user_hometown"
    fields="name,email,picture,hometown,birthday,first_name,last_name"
    callback={res => props.handlelogin('facebook', responseFacebook(res))}
    cssClass="social-btn social-btn__facebook"
    textButton="facebook"
    // icon="fa-facebook"
    // autoLoad
    returnScopes
  />
);

export default FacebookAuth;
