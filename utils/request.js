import axios from 'axios';
import { serverOrigins } from './config';
import setErrorText from './requestUtils';

export default function request(url, options = {}) {
  console.log(url, options)
  const origin = serverOrigins.local;
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
