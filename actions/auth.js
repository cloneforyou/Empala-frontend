import {
  CLEAN_ERROR_MESSAGE,
  CLEAR_LOGIN_STATE, CLEAR_REGISTRATION_DATA,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  TWO_FACTOR_AUTHENTICATION,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_REQUEST_FAIL,
  PASSWORD_UPDATE_REQUEST_SUCCESS,
  SEND_ACTIVATION_LINK_FAIL,
  SEND_ACTIVATION_LINK_REQUEST,
  SEND_ACTIVATION_LINK_SUCCESS,
  SET_ACCOUNT_BLOCKED,
  SET_ACCOUNT_UNBLOCKED,
  SET_PASSWORD_FORGOTTEN, TOGGLE_MODAL,
  UNBLOCK_REQUEST,
  UNBLOCK_REQUEST_FAIL,
  UNBLOCK_REQUEST_SUCCESS,
  SET_SOCIAL_LOGIN_MFA,
  SET_LOGIN_MFA,
  SET_SOCIAL_LOGIN_DATA,
  TOGGLE_CODE_RESEND_NEEDED,
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

export function loginRequest(provider, data) {
  return {
    type: LOGIN_REQUEST,
    provider,
    data,
  };
}

export function twoFactorAuthentication(code) {
  return {
    type: TWO_FACTOR_AUTHENTICATION,
    code,
  };
}

export function unblockAccountInit(code) {
  return {
    type: UNBLOCK_REQUEST,
    code,
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

export function setAccountUnblocked() {
  return {
    type: SET_ACCOUNT_UNBLOCKED,
  };
}

export function setPasswordForgotten() {
  return {
    type: SET_PASSWORD_FORGOTTEN,
  };
}

export function clearLoginState() {
  return {
    type: CLEAR_LOGIN_STATE,
  };
}

export function cleanErrorMessage() {
  return {
    type: CLEAN_ERROR_MESSAGE,
  };
}

export function sendActivationLink(operation) {
  return {
    type: SEND_ACTIVATION_LINK_REQUEST,
    operation,
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

export function sendPasswordUpdate(password, code) {
  return {
    type: PASSWORD_UPDATE_REQUEST,
    password,
    code,
  };
}

export function passwordUpdateFailed(err) {
  return {
    type: PASSWORD_UPDATE_REQUEST_FAIL,
    err,
  };
}

export function passwordUpdateSuccess() {
  return {
    type: PASSWORD_UPDATE_REQUEST_SUCCESS,
  };
}

export function toggleModal() {
  return {
    type: TOGGLE_MODAL,
  };
}

export function clearRegistrationData() {
  return {
    type: CLEAR_REGISTRATION_DATA,
  };
}

export function setLoginMfa() {
  return {
    type: SET_LOGIN_MFA,
  };
}

export function setSocialLoginMfa() {
  return {
    type: SET_SOCIAL_LOGIN_MFA,
  };
}

export function setSocialLoginData(data) {
  return {
    type: SET_SOCIAL_LOGIN_DATA,
    data,
  };
}

export function toggleCodeResend() {
  return {
    type: TOGGLE_CODE_RESEND_NEEDED,
  };
}
