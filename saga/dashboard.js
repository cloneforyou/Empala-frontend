import { takeEvery, all, take, select, put, call, race, fork, spawn } from 'redux-saga/effects';
import {
  GET_ETNA_DATA,
  GET_USER_DATA_REQUEST,
  LOGOUT, SUBSCRIBE_QUOTES, UNSUBSCRIBE_QUOTES,
} from '../constants/dashboard';
import { getUserData, logout } from './authentication';
import { serverOrigins } from '../utils/config';
import { eventChannel } from 'redux-saga';
import request from '../utils/request';
import axios from 'axios/index';
import {
  modifyPosition,
  setOrdersList,
  setPositions,
  setWatchLists,
  updateOrders,
  updateWatchlist,
} from '../actions/dashboard';



function* internalListener(socket) {
  const quotesKeys = yield select(state => state.dashboard.parsedPositions ? state.dashboard.parsedPositions.map(pos => pos.sec_id) : []);
  const subscribe = (quoteKey, sessionId) => socket.send(JSON.stringify({
    Cmd: 'Subscribe.txt',
    SessionId: sessionId,
    Keys: quoteKey,
    EntityType: 'Quote',
  }));
  const unsubscribe = (quoteKey, sessionId) => socket.send(JSON.stringify({
    Cmd: 'Unsubscribe.txt',
    SessionId: sessionId,
    Keys: quoteKey,
    EntityType: 'Quote',
  }));
  while (true) {
    // const data = yield take('EXE_COMMAND');
    const quotes = yield take(SUBSCRIBE_QUOTES);
    const sessionId = yield select(state => state.dashboard.sessionId);
    quotesKeys.forEach(key => subscribe(key, sessionId));
    const quotesUnsubcribe = yield take(UNSUBSCRIBE_QUOTES);
    quotesKeys.forEach(key => unsubscribe(key, sessionId));
  }
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    console.log('acttt ======>', action);
    if (action.item['Cmd'] === 'CreateSession.txt' && action.item['SessionId'] && action.type === 'quote') {
      yield put({ type: 'SET_SESSION_ID', id: action.item.SessionId });
    } if (!action.item['Cmd'] && action.item['EntityType'] === 'Quote') {
      yield put(modifyPosition(action.item));
    }
    if (!action.item['Cmd'] && action.item['EntityType'] === 'Order') {
      yield put(updateOrders(action.item));
    }
    if (!action.item['Cmd'] && action.item['EntityType'] === 'Watchlist') {
      console.log('eeeeee')
      yield call(selectETNADataRequest, { payloadType: 'watch_lists' });
    }
    if (!action.item['Cmd'] && action.item['EntityType'] === 'WatchlistContent') {
      yield put(updateWatchlist(action.item));
    }
  }
}

function watchQuotes(socket, params) {
  return eventChannel((emit) => {
    socket.onopen = (i) => {
      console.log('------------> OPEN', i);
      console.log('------------> REQ', params);
      // socket.send(JSON.stringify(request)); // Send data to server
    };
    socket.onmessage = (event) => {
      // console.log('msssg', event)
      const msg = JSON.parse(event.data);
      // console.log('===> msssg', msg)
      if (msg.Cmd === 'CreateSession.txt' && msg.SessionId) {
        console.log('WS SessionId:', msg.SessionId);
        // const sessionId = msg.SessionId;
        // return saveSessionId(msg.SessionId);
        // socket.send(JSON.stringify({ ...params, SessionId: msg.SessionId, Keys: 166 }));
        // return params.keys.forEach(key => socket.send(JSON.stringify({
        //     Cmd: 'Subscribe.txt',
        //     SessionId: msg.SessionId,
        //     Keys: key,
        //     EntityType: 'Quote',
        //   })));
      }
      if (msg.Cmd !== 'Ping') emit({ item: msg, type: 'quote' });
    };
    return () => {
      socket.close();
    };
  });
}

function* saveSessionId(id) {
  console.log('88888888')
  yield put(() => ({ type: 'SET_SESSION_ID', id }));
}

function watchMessages(socket, params) {
  return eventChannel((emit) => {
    socket.onopen = (i) => {
      console.log('------------> OPEN', i);
      console.log('------------> REQ', params);
      // socket.send(JSON.stringify(request)); // Send data to server
    };
    socket.onmessage = (event) => {
      // console.log('msssg', event)
      const msg = JSON.parse(event.data);
      // console.log('===> msssg', msg)
      if (msg.Cmd === 'CreateSession.txt' && msg.SessionId) {
        console.log('WS SessionId:', msg.SessionId)
        // socket.send(JSON.stringify({ ...params, SessionId: msg.SessionId, Keys: 166 }));
        return params.EntityType.forEach(type => socket.send(JSON.stringify({
          ...params,
          EntityType: type,
          SessionId: msg.SessionId,
          Keys: type === 'Order' ? params.Credentials.accountId : params.Credentials.userId,
        })));
      }
      if (msg.Cmd !== 'Ping') emit({ item: msg });
    };
    return () => {
      socket.close();
    };
  });
}

function* wsHandling() {
  while (true) {
    const data = yield take('START_WEBSOCKET');
    const ETNACredentials = yield select(state => (
      state.dashboard.userData ? state.dashboard.userData.data.etna_credentials : {}));
    console.log('==>', ETNACredentials)
    const query = `User=${ETNACredentials.userId}:${ETNACredentials.dataSessionId}&Password=${ETNACredentials.dataSessionId}&HttpClientType=WebSocket`;
    const queryQuote = `User=${ETNACredentials.userId}:${ETNACredentials.quoteSessionId}&Password=${ETNACredentials.quoteSessionId}&HttpClientType=WebSocket`;
    const params = {
      Cmd: 'Subscribe.txt',
      SessionId: '',
      EntityType: ['Order', 'Watchlist'],
      HttpClientType: 'WebSocket',
      Credentials: ETNACredentials,
    };
    // const socket = new WebSocket(`${ETNACredentials.dataUrl}/CreateSession.txt?${query}`);
    const socketQuotes = new WebSocket(`${ETNACredentials.quoteUrl}/CreateSession.txt?${queryQuote}`);
    const socketData = new WebSocket(`${ETNACredentials.dataUrl}/CreateSession.txt?${query}`);
    const quotesKeys = yield select(state => state.dashboard.parsedPositions ? state.dashboard.parsedPositions.map(pos => pos.sec_id) : [])
    // const socketQuotes = [166, 7].map(key => new WebSocket(`${ETNACredentials.quoteUrl}/CreateSession.txt?${queryQuote}`));
    console.log(' ** SOCKET', socketQuotes);
    // const socketChannel = yield call(watchMessages, socket, request);
    const quoteChannel = yield call(watchQuotes, socketQuotes, { ...params, keys: quotesKeys, EntityType: 'Quote' });
    const ordersChannel = yield call(watchMessages, socketData, params);
    const { cancel } = yield race({
      task: [
        call(externalListener, ordersChannel),
        call(externalListener, quoteChannel),
        call(internalListener, socketQuotes),
      ],
      cancel: take('STOP_WEBSOCKET'),
    });
    if (cancel) {
      socketChannel.close();
    }
  }
}

/*  --------- ETNA TEST API FUNCTIONS ---------- */
const etnaConfig = {
  api_path: '/api/etna_test',
  headers: {
    // 'X-API-ROUTING': 'empala_demo_prod',
    // 'X-API-KEY': '6MlBcQqCm52RnoTqhuzfH2q8RNqfAvwpnOFpl259',
    // 'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
    // Accept: '*/*',

  },
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
      // pageNumber: 0,
      accountId: credentials.accountId,
      // accounts: '4',
      pageSize: 0,
      // symbol: 'GOOG',
      // orderStatuses: [1, 2],
      // orderType: 0,
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
  console.log('waaaatttttchhhhhlist =>', res)
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
  console.log('poooooosiiiiiitiiiiiiooooooons =>', res)
  if (res) yield put(setPositions(res.data.Result));
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
    default: return false;
  }
  return false;
}

/*  --------- ETNA TEST API FUNCTIONS  END ---------- */

export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(LOGOUT, logout),
    // takeEvery(GET_ORDERS_LIST, get_orders_list),
    takeEvery(GET_ETNA_DATA, selectETNADataRequest),
    // wsHandling(),
  ]);
}


