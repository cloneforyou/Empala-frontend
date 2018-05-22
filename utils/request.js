import axios from 'axios';
import { serverOrigins } from "./config";


export default function request(url, options = {}) {
  console.log('------------------------------', url, options)
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
      // console.log(' *** ------------> SERVER RESPOND ERROR', JSON.stringify(err));
      const error = new Error(setErrorText(err));
      throw error
    });

  function setErrorText(err) {
    if (err.response && err.response.status === 401) {
      if (err.response.data.info === 'INVALID_VALUE') {
        return 'Already in use';
      } else if (err.response.data.info === 'MISSING_CHECK_TYPE') {
        return 'Validation failed'
      }
    }
  }
}
