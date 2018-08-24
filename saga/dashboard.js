import {
  takeEvery,
  all,
  take,
  select,
  put,
  call,
  takeLatest,
  race,
  spawn,
  cancel,
} from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  GET_ETNA_DATA,
  GET_USER_DATA_REQUEST,
  LOGOUT,
  MUTE_NOTIFICATIONS,
  REFRESH_TOKEN_REQUEST,
  RESTART_SESSION_TIMEOUT,
  START_WEBSOCKET,
  STOP_WEBSOCKET,
  GET_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
  SET_COMPLETE_ACTION,
} from '../constants/dashboard';
import { getUserData, logout, refreshTokens } from './authentication';
import request from '../utils/request';
import {
  addNotification,
  dropNotification,
  openModal,
  setAppSettings,
  setOrdersList,
  setPositions,
  setSessionTimeRemain,
  setWatchLists,
  updateNews,
  setAllNotifications, setLastNotifications, refreshNotificationsCounter,
} from '../actions/dashboard';
import { serverOrigins } from '../utils/config';

const urls = {
  notifications: {
    mute: '/api/notifications/settings',
    read: '/api/notifications/view/',
    get: '/api/notifications/',
    complete: '/api/notifications/complete',
  },
};

export function* sessionTimeout() {
  let timeout = yield select(state => state.dashboard.appSettings.session_timeout || 600);
  timeout += 30;
  yield put(setSessionTimeRemain(timeout));
  while (timeout > 0) {
    yield delay(1000);
    yield timeout -= 1;
    yield put(setSessionTimeRemain(timeout));
    if (timeout === 120) yield put(openModal('sessionExpire'));
  }
  return yield logout();
}
export function* getNews() {
  const url = '/api/dashboard/updates';
  const options = {
    method: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  while (true) {
    yield delay(60000);
    try {
      const news = yield call(request, url, options);
      if (news) yield put(updateNews(news.data.data.internal_news));
    } catch (err) {
      console.error(' ** DASHBOARD ERROR =======>', err);
    }
  }
}

export function* getAppSettings() {
  const url = '/api/settings';
  const options = {
    method: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  try {
    const resp = yield call(request, url, options);
    if (resp) yield put(setAppSettings(resp.data.data));
  } catch (err) {
    console.error(' ** DASHBOARD ERROR =======>', err);
  }
}

/*  --------- ETNA TEST API FUNCTIONS ---------- */
const etnaConfig = {
  api_path: '/api/etna_test',
};

function* getENTAData(url, params) {
  if (url && params) {
    try {
      const res = yield call(request, url, params);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  }
}

function* get_orders_list(credentials) {
  const url = `${etnaConfig.api_path}/orders_list_page`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
      accountId: credentials.accountId,
      pageSize: 0,
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  if (res) yield put(setOrdersList(res.data.Result.Orders));
}

function* get_watchlists(credentials) {
  const url = `${etnaConfig.api_path}/watchlists`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  // console.log('waaaatttttchhhhhlist =>', res)
  if (res) yield put(setWatchLists(res.data.Result));
}

function* get_positions(credentials) {
  const url = `${etnaConfig.api_path}/get_positions`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
      accountId: credentials.accountId,
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  // console.log('poooooosiiiiiitiiiiiiooooooons =>', res)
  if (res) yield put(setPositions(res.data.Result));
}

function* get_balance(credentials) {
  const url = `${etnaConfig.api_path}/get_balance`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
      accountId: credentials.accountId,
      currency: 'USD', // further will get from store maybe
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  console.log('balance =>', res);
}

export function* selectETNADataRequest({ payloadType }) {
  const ETNACredentials = yield select(state => (
    state.dashboard.userData ? state.dashboard.userData.data.etna_credentials : {}));
  switch (payloadType) {
    case 'orders_list':
      yield get_orders_list(ETNACredentials);
      break;
    case 'watch_lists':
      yield get_watchlists(ETNACredentials);
      break;
    case 'positions':
      yield get_positions(ETNACredentials);
      break;
    case 'balance':
      yield get_balance(ETNACredentials);
      break;
    default: return false;
  }
  return false;
}

/*  --------- ETNA TEST API FUNCTIONS  END ---------- */

/* ---------- EMPALA SOCKET IO HANDLING ----------*/
const socketServerURL = serverOrigins.local;
// const socket = io();
const connect = async token => io.connect(socketServerURL, {
  query: {
    token,
  },
});

const createSocketChannel = socket => eventChannel((emit) => {
  const handler = (data) => {
    emit(data);
  };
  socket.on('connect', () => console.log('OPEN ====>>>', socket));
  socket.on('notification', handler);
  socket.on('disconnect', () => console.log('Disconnected:', socket));
  return () => {
    socket.off('newTask', handler);
  };
});

function* socketListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    if (action.notification) yield put(addNotification(action.notification));
    // console.log('message:', action);
    yield put(refreshNotificationsCounter(action.counts));
    yield dropNotificationAtTimeout();
  }
}

function* wsHandling() {
  while (true) {
    const data = yield take(START_WEBSOCKET);
    const token = localStorage.getItem('accessToken');
    const connection = yield connect(token);
    const empalaChannel = yield call(createSocketChannel, connection);
    const { cancel } = yield race({
      task:
        [
          call(socketListener, empalaChannel),
          // dropNotificationAtTimeout(),
        ],
      cancel: take(STOP_WEBSOCKET),
    });
    if (cancel) {
      empalaChannel.close();
    }
  }
}

function* dropNotificationAtTimeout() {
  const timeout = 8000;
  // while (true) {
  yield delay(timeout);
  yield put(dropNotification(0));
  // }
}

function* handleNotifications(action) {
  let url;
  const muted = yield select(state => state.dashboard.notificationsMuted);
  const options = {
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
    method: 'GET',
  };
  if (action.type === MUTE_NOTIFICATIONS) {
    url = urls.notifications.mute;
    options.method = 'PATCH';
    options.data = { notifications_mute: `${muted}` };
  } else if (action.type === SET_NOTIFICATION_READ) {
    url = urls.notifications.read;
    if (!action.id) url += 'all';
  } else {
    options.method = 'POST';
    options.data = { ids: Array.isArray(action.id) ? action.id : action.id.toString.split(',') };
  }
  try {
    const resp = yield call(request, url, options);
  } catch (err) {
    console.error(' ** NOTIFICATIONS ERROR =======>', err);
  }
}

function* getNotifications(action) {
  const latestQuantity = 5;
  const { page, limit, collect } = action.options || {};
  let url = urls.notifications.get;
  if (page || limit) {
    url += `?page=${!!page && page}&limit=${!!limit && limit}`;
  } else if (collect === 'latest') {
    url += `?limit=${latestQuantity}`;
  }
  const options = {
    method: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  try {
    const resp = yield call(request, url, options);
    if (resp) {
      if (collect === 'latest') yield put(setLastNotifications(resp.data.data));
      if (!collect || collect === 'all') yield put(setAllNotifications(resp.data.data));
    }
  } catch (err) {
    console.error(' ** NOTIFICATIONS GET ERROR =======>', err);
  }
}

function* setCompleteAction(action) {
  let url = urls.notifications.get + 'complete?id=' + action.id;
  const options = {
    method: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  try {
    const resp = yield call(request, url, options);
    yield getNotifications({ options:{} });
  } catch (err) {
    console.error(' ** NOTIFICATIONS GET ERROR =======>', err);
  }
}

export default function* dashboardSaga() {
  yield all([
    wsHandling(),
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(GET_USER_DATA_REQUEST, getAppSettings),
    takeEvery(LOGOUT, logout),
    takeEvery(SET_NOTIFICATION_READ, handleNotifications),
    takeEvery(MUTE_NOTIFICATIONS, handleNotifications),
    takeEvery(GET_ETNA_DATA, selectETNADataRequest),
    takeEvery(GET_NOTIFICATIONS, getNotifications),
    takeEvery(SET_COMPLETE_ACTION, setCompleteAction),
    takeLatest(RESTART_SESSION_TIMEOUT, sessionTimeout),
    takeLatest(REFRESH_TOKEN_REQUEST, refreshTokens),
  ]);
}
