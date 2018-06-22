import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { clientsId } from '../../../utils/config';

const responseFacebook = (response) => {
  if (!response) return false;
  if (response.error) {
    console.log(response.error.message);
    return false;
  }
  console.log(response)
  return response;
};

const FacebookAuth = (props) => (
  <FacebookLogin
    appId={clientsId.faceBook}
    scope="public_profile, email, user_birthday, user_hometown"
    fields="name,email,picture,hometown,birthday,first_name,last_name"
    callback={res => props.handlelogin('facebook', responseFacebook(res))}
    cssClass="social-btn social-btn__facebook social-btn__facebook-moved"
    textButton="Facebook"
    // icon="fa-facebook"
    // autoLoad
    returnScopes
  />
);

export default FacebookAuth;
