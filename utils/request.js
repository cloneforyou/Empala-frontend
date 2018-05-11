import axios from 'axios';

export default function request(url, options = {}) {
  return axios({
    method: 'POST',
    url: `http://localhost:9000${url}`,
    data: options.data,
    headers: options.headers,
    credentials: options.credentials,
    mode: "cors",
    withCredentials: true
  })
    .then(response => {
      console.log(' *** res', response);
    })
    .catch(err => {
      console.log(' *** ------------> SERVER RESPOND ERROR', JSON.stringify(err));
      const error = new Error(setErrorText(err));
      throw error
    });

  function setErrorText(err) {
    if (err.response && err.response.status === 401) {
      if (err.response.data.info === 'INVALID_VALUE') {
        return 'Already in use';
      }
    }
  }

  // const endpoint = '';
  // const defaultHeaders = {
  //   'X-Requested-With': 'XMLHttpRequest',
  //   Accept: 'application/json',
  //   // Accept: '*/*',
  //   'Content-Type': 'application/json',
  // };
  //
  // const requestOptions = {
  //   ...options,
  //   headers: Object.assign(defaultHeaders, options.headers)
  // };
  //
  // // Missing boundary in multipart/form-data fix https://stackoverflow.com/a/41604180/2156864
  // if (requestOptions.headers['Content-Type'] === 'multipart/form-data') {
  //   delete requestOptions.headers['Content-Type'];
  // }
  //
  // requestOptions.withCredentials =  true;
  // requestOptions.credentials = 'include';
  // requestOptions.mode = 'cors';
  //
  // let requestUrl = url;
  // // add default endpoint only to relative urls
  // if (requestUrl.indexOf('://') === -1) {
  //   requestUrl = endpoint + requestUrl;
  // }
  //
  // return new Promise((resolve, reject) => {
  //   console.log(' *** ', requestUrl, requestOptions);
  //   fetch(`http://localhost:9000/auth/check`, requestOptions)
  //     .then(response => {
  //       if (response.status >= 200 && response.status < 400) {
  //         if (response.redirected === true) {
  //           return response;
  //         }
  //         if(response.headers.get('Content-Type') === 'application/json'){
  //           return response.json()
  //         }
  //         else{
  //           return response.text();
  //         }
  //       }
  //       return reject(response);
  //     })
  //     .then((response) => {
  //       return resolve(response);
  //     })
  //     .catch((error) => reject({ message: error }));
  // });
}