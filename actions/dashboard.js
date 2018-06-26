import { listContries } from '../localdata/marketAccesLists';

import {
  GET_USER_DATA_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  START_WEBSOCKET,
  SET_ACTIVE_PAGE,
  CLEAN_IMAGE_DATA,
  UPLOAD_IMAGE_REQUEST,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_UPLOADABLE_IMAGE,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_SUCCESS,
  CLEAN_ERROR_TEXT,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS, LOGOUT, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS,
} from '../constants/dashboard';
import {SET_FIELD_VALUE} from "../constants/registration";

export function collapseSidebar(bool) {
  return {
    type: 'COLLAPSE_SIDEBAR',
    sidebarCollapsed: bool,
  };
}

export function getUserData() {
  return {
    type: GET_USER_DATA_REQUEST,
  };
}

export function setUserData(data) {
  return {
    type: GET_USER_DATA_SUCCESS,
    data,
  };
}

export function setUserError(err) {
  return {
    type: GET_USER_DATA_FAIL,
    err,
  };
}

export function refreshTokens() {
  return {
    type: REFRESH_TOKEN_REQUEST,
  };
}

export function startSocket() {
  return {
    type: START_WEBSOCKET,
  };
}


export function setGroupCountry(label) {
  let group = {};
  listContries.forEach((item) => {
    if (item.label === label) {
      group = item;
    }
  });
  return {
    type: 'CHOOSE_GROUP_COUNTRY',
    selectedGroup: group,
  };
}


export const setActivePage = page => ({
  type: SET_ACTIVE_PAGE,
  page,
});

export const cleanImage = () => ({
  type: CLEAN_IMAGE_DATA,
});

export const setUploadableImage = img => ({
  type: SET_UPLOADABLE_IMAGE,
  img,
});

export const uploadImage = data => ({
  type: UPLOAD_IMAGE_REQUEST,
  data,
});

export const uploadImageFail = err => ({
  type: UPLOAD_IMAGE_FAIL,
  err,
});

export const uploadImageSuccess = data => ({
  type: UPLOAD_IMAGE_SUCCESS,
  data,
});

export const openModal = name => ({
  type: OPEN_MODAL,
  name,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const cleanErrorText = () => ({
  type: CLEAN_ERROR_TEXT,
});

export function setInputFieldValueById(id, value) {
  return {
    type: SET_FIELD_VALUE,
    id,
    value,
  };
}

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT_REQUEST,
});

export const deleteAccountFail = err => ({
  type: DELETE_ACCOUNT_FAIL,
  err,
});

export const deleteAccountSuccess = () => ({
  type: DELETE_ACCOUNT_SUCCESS,
});

export const logout = () => ({
  type: LOGOUT,
});
