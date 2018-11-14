import axios from 'axios';
import { cityfalcon } from '../keys';


export default function requestExternalNews(url, options = {}) {
  const { token } = cityfalcon;
  return axios({
    method: options.method,
    url: `${url}${token}`,
  })
    .then(response => response)
    .catch((err) => {
      console.log('Error', err);
    });
}
