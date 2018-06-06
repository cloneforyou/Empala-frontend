import { listContries } from '../localdata/marketAccesLists';

import {
  GET_USER_DATA_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  START_WEBSOCKET,
  SET_ACTIVE_PAGE, CLEAN_IMAGE_DATA, UPLOAD_IMAGE_REQUEST, OPEN_MODAL, CLOSE_MODAL,
} from '../constants/dashboard';

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

export const uploadImage = data => ({
  type: UPLOAD_IMAGE_REQUEST,
  data,
});

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
