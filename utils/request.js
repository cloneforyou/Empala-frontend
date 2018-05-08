export default function request(url, options = {}) {
  const endpoint = '';
  const defaultHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    // Accept: '*/*',
    'Content-Type': 'application/json',
    'Current-Version': 'v1',
  };

  const requestOptions = {
    ...options,
    headers: Object.assign(defaultHeaders, options.headers),
  };

  // Missing boundary in multipart/form-data fix https://stackoverflow.com/a/41604180/2156864
  if (requestOptions.headers['Content-Type'] === 'multipart/form-data') {
    delete requestOptions.headers['Content-Type'];
  }

  requestOptions.withCredentials =  true;
  requestOptions.credentials = 'include';

  let requestUrl = url;
  // add default endpoint only to relative urls
  if (requestUrl.indexOf('://') === -1) {
    requestUrl = endpoint + requestUrl;
  }

  return new Promise((resolve, reject) => {
    console.log(' *** ', requestUrl, requestOptions);
    fetch(requestUrl, requestOptions)
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          if (response.redirected === true) {
            return response;
          }
          if(response.headers.get('Content-Type') === 'application/json'){
            return response.json()
          }
          else{
            return response.text();
          }
        }
        return reject(response);
      })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => reject({ message: error }));
  });
}