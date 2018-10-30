import axios from 'axios';
import { serverOrigins } from './config';
import setErrorText from './requestUtils';
import { origin as env } from '../keys';

export default function request(url, options = {}) {
  const origin = env === 'dev'
    ? serverOrigins.local
    : serverOrigins.aws;
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
