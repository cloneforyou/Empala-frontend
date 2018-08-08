import axios from 'axios';
import { serverOrigins } from './config';
import setErrorText from './requestUtils';

export default function request(url, options = {}) {
  // const port = 9000;
  // const isNode = require('detect-node');
  // const origin = isNode ? null : `http://${window.location.hostname}:${port}`;
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
