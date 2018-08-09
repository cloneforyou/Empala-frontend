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
  DELETE_ACCOUNT_SUCCESS,
  LOGOUT,
  SET_COLOR_SCHEME,
  SAVE_COLOR_SCHEME,
  SET_COLOR_SCHEME_SUCCESS,
  SET_COLOR_SCHEME_ERROR,
  GET_ORDERS_LIST,
  SET_ORDERS_LIST,
  GET_ETNA_DATA,
  SET_WATCH_LISTS,
  SET_WATCHLIST_NUMBER,
  SET_POSITIONS,
  MODIFY_POSITION_DATA,
  UPDATE_WATCHLIST,
  UPDATE_ORDERS_LIST,
  SUBSCRIBE_QUOTES,
  UNSUBSCRIBE_QUOTES,
  SET_PARSED_POSITIONS,
  UPDATE_QUOTES,
  SUBSCRIBE_WATCHLIST_CONTENT,
  UNSUBSCRIBE_WATCHLIST_CONTENT,
  UPDATE_NEWS,
  SHOW_POPUP_PIN,
  CLOSE_POPUP_PIN,
} from '../constants/dashboard';
import { SET_FIELD_VALUE } from '../constants/registration';

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

export const setColorScheme = colorScheme => ({
  type: SET_COLOR_SCHEME,
  colorScheme,
});

export const saveColorTheme = colorTheme => ({
  type: SAVE_COLOR_SCHEME,
  colorTheme,
});

export const setColorSchemeError = err => ({
  type: SET_COLOR_SCHEME_ERROR,
  err,
});

export const getOrdersList = () => ({
  type: GET_ORDERS_LIST,
});

export const getETNAData = payloadType => ({
  type: GET_ETNA_DATA,
  payloadType,
});

export const setOrdersList = data => ({
  type: SET_ORDERS_LIST,
  data,
});

export const setWatchLists = data => ({
  type: SET_WATCH_LISTS,
  data,
});

export const setWatchListNumber = number => ({
  type: SET_WATCHLIST_NUMBER,
  number,
});

export const setPositions = data => ({
  type: SET_POSITIONS,
  data,
});
export const setParsedPositions = data => ({
  type: SET_PARSED_POSITIONS,
  data,
});

export const modifyPosition = data => ({
  type: MODIFY_POSITION_DATA,
  data,
});

export const updateOrders = data => ({
  type: UPDATE_ORDERS_LIST,
  data,
});
export const updateWatchlist = data => ({
  type: UPDATE_WATCHLIST,
  data,
});

export const subscribeQuotes = () => ({
  type: SUBSCRIBE_QUOTES,
});

export const unsubscribeQuotes = () => ({
  type: UNSUBSCRIBE_QUOTES,
});

export const subscribeWatchlists = () => ({
  type: SUBSCRIBE_WATCHLIST_CONTENT,
});

export const unsubscribesubscribeWatchlists = () => ({
  type: UNSUBSCRIBE_WATCHLIST_CONTENT,
});

export const updateQuotes = quote => ({
  type: UPDATE_QUOTES,
  quote,
});

export const updateNews = news => ({
  type: UPDATE_NEWS,
  news,
});

export function showPopupPIN(entityType) {
  return {
    type: SHOW_POPUP_PIN,
    entityType,
  };
}

export function closePopupPIN() {
  return {
    type: CLOSE_POPUP_PIN,
  };
}