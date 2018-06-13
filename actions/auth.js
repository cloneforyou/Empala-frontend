import {
  CLEAN_ERROR_MESSAGE,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS, SEND_ACTIVATION_LINK_FAIL, SEND_ACTIVATION_LINK_REQUEST, SEND_ACTIVATION_LINK_SUCCESS,
  SET_ACCOUNT_BLOCKED,
  SET_ACCOUNT_UNBLOCKED,
  UNBLOCK_REQUEST,
  UNBLOCK_REQUEST_FAIL,
  UNBLOCK_REQUEST_SUCCESS,
} from '../constants/auth';

export function loginFailed(err) {
  return {
    type: LOGIN_REQUEST_FAIL,
    err,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_REQUEST_SUCCESS,
  };
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}


export function unblockAccountInit(code) {
  return {
    type: UNBLOCK_REQUEST,
    code
  };
}


export function unblockSuccess() {
  return {
    type: UNBLOCK_REQUEST_SUCCESS,
  };
}

export function unblockFailed(err) {
  return {
    type: UNBLOCK_REQUEST_FAIL,
    err,
  };
}

export function setAccountBlocked() {
  return {
    type: SET_ACCOUNT_BLOCKED,
  };
}

export function setAccountunBlocked() {
  return {
    type: SET_ACCOUNT_UNBLOCKED,
  };
}

export function cleanErrorMessage() {
  return {
    type: CLEAN_ERROR_MESSAGE,
  };
}

export function sendActivationLink() {
  return {
    type: SEND_ACTIVATION_LINK_REQUEST,
  };
}


export function sendActivationLinkSuccess() {
  return {
    type: SEND_ACTIVATION_LINK_SUCCESS,
  };
}

export function sendActivationLinkFailed(err) {
  return {
    type: SEND_ACTIVATION_LINK_FAIL,
    err,
  };
}
