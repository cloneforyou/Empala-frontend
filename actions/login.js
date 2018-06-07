const constants = {
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_FAIL: 'LOGIN_REQUEST_FAIL',
};

export function loginFailed(err) {
  return {
    type: constants.LOGIN_REQUEST_FAIL,
    err,
  };
}

export function loginSuccess(err) {
  return {
    type: constants.LOGIN_REQUEST_SUCCESS,
  };
}
