import axios from 'axios';
import origins from './config';
import setErrorText from './requestUtils';
import { origin as env } from '../keys';

// Set backend origin
let origin = origins.dev;
if (env === 'stage') origin = origins.stage;
if (env === 'prod') origin = origins.prod;

export default function request(url, options = {}) {
  if (options.method === 'DELETE') {
    return (axios.delete(`${origin}${url}`, { headers: options.headers }))
      .then(response => response)
      .catch((err) => {
        const error = setErrorText(err);
        if (error) {
          throw error;
        } else throw err;
      });
  }
  return axios({
    method: options.method,
    url: `${origin}${url}`,
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
