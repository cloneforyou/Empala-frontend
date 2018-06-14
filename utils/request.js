import axios from 'axios';
import { serverOrigins } from './config';

export default function request(url, options = {}) {
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
    return false;
  }
  // console.log('------------------------------', url, options)
  return axios({
    method: options.method,
    url: `${serverOrigins.local}${url}`,
    data: options.data,
    headers: options.headers,
    credentials: options.credentials,
    mode: 'cors',
    withCredentials: true,
  })
    .then(response => response)
    .catch((err) => {
      // console.log(' *** ------------> SERVER RESPOND ERROR', JSON.stringify(err));
      const error = setErrorText(err);
      if (error) {
        throw error;
      } else throw err;
    });
}
