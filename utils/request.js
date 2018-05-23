import axios from 'axios';
import { serverOrigins } from "./config";


export default function request(url, options = {}) {
  // console.log('------------------------------', url, options)
  return axios({
    method: options.method,
    url: `${serverOrigins.local}${url}`,
    data: options.data,
    headers: options.headers,
    credentials: options.credentials,
    mode: "cors",
    withCredentials: true
  })
    .then(response => {
      // console.log(' ** request response', response);
      return response;
    })
    .catch(err => {
      console.log(' *** ------------> SERVER RESPOND ERROR', JSON.stringify(err));
      const error = setErrorText(err);
       if (error) { throw error }
       else throw err;
    });

  function setErrorText(err) {
    if (err.response && err.response.status === 401) {
      if (err.response.data.info === 'INVALID_VALUE') {
        return  new Error('Already in use');
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
      }
      return false;
    }
  }
}
