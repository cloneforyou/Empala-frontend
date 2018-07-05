import axios from 'axios';
import { serverOrigins } from './config';

export default function request(url, options = {}) {
  // const port = 9000;
  // const isNode = require('detect-node');
  // const origin = isNode ? null : `http://${window.location.hostname}:${port}`;
  function setErrorText(err) {
    if (err.response && err.response.status === 401) {
      if (err.response.data.info === 'INVALID_VALUE') {
        return new Error('Already in use');
      } else if (err.response.data.info === 'MISSING_CHECK_TYPE') {
        return new Error('Validation failed');
      } else if (err.response.data.info === 'MISSING_ACCESS_TOKEN') {
        return new Error('Missing access token');
      } else if (err.response.data.info === 'TOKEN_EXPIRED') {
        return new Error('Token expired');
      } else if (err.response.data.info === 'MISSING_REFRESH_TOKEN') {
        return new Error('Missing refresh token');
      } else if (err.response.data.info === 'REFRESH_TOKEN_EXPIRED') {
        return new Error('Refresh token expired');
      } else if (err.response.data.info === 'ACCESS_DENIED' && err.response.data.misc === 'ACCOUNT_NOT_FOUND') {
        return new Error('We could not find an Empala membership associated to that email address');
      } else if (err.response.data.info === 'ACCESS_DENIED' &&
        err.response.data.misc === 'ACCOUNT_SUSPENDED') {
        return new Error('Account suspended');
      } else if (err.response.data.info === 'ACCESS_DENIED' || err.response.data.info === 'WRONG_CREDENTIALS') {
        return new Error('Invalid credentials');
      } else if (err.response.data.info === 'ACCOUNT_SUSPENDED' &&
        err.response.data.misc === 'MAX_AUTH_FAILS') {
        return new Error('Account suspended');
      } else if (err.response.data.info === 'INVALID_ACTIVATION_CODE') {
        return new Error('Invalid activation code');
      } else if (err.response.data.info === 'WRONG_VERIFICATION_CODE') {
        return new Error('Wrong verification code');
      }
    }
    if (err.response && err.response.status === 403) {
      if (err.response.data.info === 'INVALID_PASSWORD' && err.response.data.misc === 'PASSWORD_WAS_ALREADY_USED') {
        return new Error('Password was already used');
      }
    }
    if (err.response && err.response.status === 400) {
      if (err.response.data.info === 'MATCHING_PASSWORDS') {
        return new Error('New password matches old password');
      }
    }
    return false;
  }
  return axios({
    method: options.method,
    // url: `${origin || serverOrigins.local}${url}`,
    url: `${serverOrigins.local}${url}`,
    data: options.data,
    headers: options.headers,
    credentials: options.credentials,
    mode: 'cors',
    withCredentials: true,
  })
    .then(response => response)
    .catch((err) => {
      const error = setErrorText(err);
      if (error) {
        throw error;
      } else throw err;
    });
}
