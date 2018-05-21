import {
  GET_USER_DATA_FAIL, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS,
  REFRESH_TOKEN_REQUEST
} from "../constants/dashboard";

export function collapseSidebar(bool) {
  return  {
    type: 'COLLAPSE_SIDEBAR',
    sidebarCollapsed: bool,
  }
}

export function getUserData() {
  return {
    type: GET_USER_DATA_REQUEST,
  }
}

export function setUserData(data) {
  return {
    type: GET_USER_DATA_SUCCESS,
    data,
  }
}

export function setUserError(err) {
  return {
    type: GET_USER_DATA_FAIL,
    err,
  }
}

export function refreshTokens() {
  return  {
    type: REFRESH_TOKEN_REQUEST,
  }
}

