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
  SET_FIELD_VALUE,
  SET_APP_SETTINGS,
  REFRESH_TOKENS,
  ADD_NOTIFICATION,
  DROP_NOTIFICATION,
  SET_NOTIFICATION_READ,
  MUTE_NOTIFICATIONS,
  CHOOSE_GROUP_COUNTRY,
  GET_NOTIFICATIONS,
  SET_ALL_NOTIFICATIONS,
  SET_LAST_NOTIFICATIONS,
  REFRESH_NOTIFICATION_COUNTER,
  SET_COMPLETE_ACTION,
  CHECK_UNREAD_NOTIFICATIONS,
  UPDATE_NOTIFICATION_RECEIVED,
  UPDATE_EXTERNAL_NEWS,
  UPDATE_NOTIFICATION_UNREAD,
  UPDATE_SOCIAL,
  SET_ACCOUNT_BALANCE,
  DROP_LATEST_NOTIFICATIONS,
  RESET_RANGE,
  TOGGLE_LEAGUE,
  GET_LEAGUE_DATA,
  SET_LOCAL_LOADER,
  SET_LEAGUE_DATA,
  OPEN_INFO_POPUP,
  CLOSE_INFO_POPUP,
  SET_TABLE_SORT_SETTINGS,
  TOGGLE_LEAGUE_DIVIDER,
  SET_ACTIVE_MARKET_PAGE,
  UPDATE_QUOTES_LIST,
  GET_EDOCUMENTS_LIST_REQUEST,
  GET_EDOCUMENTS_LIST_SUCCESS,
  GET_EDOCUMENTS_LIST_FAILED,
  SET_ACCESS_TOKEN,
  SET_LEGAL_MESSAGES, ETNA_SOCKET_STARTED, ETNA_SOCKET_STOPPED,
} from '../constants/dashboard';


export function setLegalMessages(messages) {
  return {
    type: SET_LEGAL_MESSAGES,
    messages,
  };
}

export function getEDocumentsListFailed(err) {
  return {
    type: GET_EDOCUMENTS_LIST_FAILED,
    err,
  };
}

export function getEDocumentsListSuccess(list) {
  return {
    type: GET_EDOCUMENTS_LIST_SUCCESS,
    list,
  };
}

export function getEDocumentsListRequest() {
  return {
    type: GET_EDOCUMENTS_LIST_REQUEST,
  };
}

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

export function setETNASocketStarted() {
  return {
    type: ETNA_SOCKET_STARTED,
  };
}

export function setETNASocketStopped() {
  return {
    type: ETNA_SOCKET_STOPPED,
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
    type: CHOOSE_GROUP_COUNTRY,
    selectedGroup: group,
  };
}


export const setActivePage = page => ({
  type: SET_ACTIVE_PAGE,
  page,
});

export const setActiveMarketPage = page => ({
  type: SET_ACTIVE_MARKET_PAGE,
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

export const setAccountBalance = (data, provider) => ({
  type: SET_ACCOUNT_BALANCE,
  data,
  provider,
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

export const updateAllQuotes = quotes => ({
  type: UPDATE_QUOTES_LIST,
  quotes,
});

export const updateNews = news => ({
  type: UPDATE_NEWS,
  news,
});

export const updateSocial = data => ({
  type: UPDATE_SOCIAL,
  data,
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

export function setAppSettings(data) {
  return {
    type: SET_APP_SETTINGS,
    data,
  };
}


export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    notification,
  };
}

export function refreshNotificationsCounter(counter) {
  return {
    type: REFRESH_NOTIFICATION_COUNTER,
    counter,
  };
}

export function dropNotification(index) {
  return {
    type: DROP_NOTIFICATION,
    index,
  };
}

export function dropLatestNotifications() {
  return {
    type: DROP_LATEST_NOTIFICATIONS,
  };
}

export function setNotificationRead(id) {
  return {
    type: SET_NOTIFICATION_READ,
    id,
  };
}

export function muteNotifications() {
  return {
    type: MUTE_NOTIFICATIONS,
  };
}

export function setAllNotifications(data) {
  return {
    type: SET_ALL_NOTIFICATIONS,
    data,
  };
}

export function setLastNotifications(data) {
  return {
    type: SET_LAST_NOTIFICATIONS,
    data,
  };
}

export function getNotifications(options) {
  /* ====== options:
   limit - number of notifications to get
   page - number of pages for pagination
   collect - enum ['latest', 'all'], for special notifications collect
   */
  return {
    type: GET_NOTIFICATIONS,
    options,
  };
}

export function setCompleteAction(id, popup) {
  return {
    type: SET_COMPLETE_ACTION,
    id,
    popup,
  };
}

export function updateNotificationReceived(flag) {
  return {
    type: UPDATE_NOTIFICATION_RECEIVED,
    flag,
  };
}

export function updateNotificationUnread(flag) {
  return {
    type: UPDATE_NOTIFICATION_UNREAD,
    flag,
  };
}

export function checkUnreadNotifications() {
  return {
    type: CHECK_UNREAD_NOTIFICATIONS,
  };
}

export function updateExternalNews(data) {
  return {
    type: UPDATE_EXTERNAL_NEWS,
    data,
  };
}

export function resetRange(name) {
  return {
    type: RESET_RANGE,
    name,
  };
}

export function toggleLeague(name) {
  return {
    type: TOGGLE_LEAGUE,
    name,
  };
}

export function getLeagueData() {
  return {
    type: GET_LEAGUE_DATA,
  };
}

export function setLeagueData(data) {
  return {
    type: SET_LEAGUE_DATA,
    data,
  };
}

export function setLocalLoader(entity, status) {
  return {
    type: SET_LOCAL_LOADER,
    entity,
    status,
  };
}

export function openInfoPopup(name) {
  return {
    type: OPEN_INFO_POPUP,
    name,
  };
}

export function closeInfoPopup() {
  return {
    type: CLOSE_INFO_POPUP,
  };
}

export function setTableSortSettings(tableId, sortIndex, direction) {
  return {
    type: SET_TABLE_SORT_SETTINGS,
    tableId,
    sortIndex,
    direction,
  };
}

export function toggleLeagueDivider() {
  return {
    type: TOGGLE_LEAGUE_DIVIDER,
  };
}

export function setAccessToken(token) {
  return {
    type: SET_ACCESS_TOKEN,
    token,
  };
}

