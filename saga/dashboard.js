import { takeEvery, all, take, select, put, call, race } from 'redux-saga/effects';
import openSocket from 'socket.io-client';
import {
  GET_ORDERS_LIST,
  GET_USER_DATA_REQUEST,
  LOGOUT,
} from '../constants/dashboard';
import { getUserData, logout } from './authentication';
import { serverOrigins } from '../utils/config';
import { eventChannel } from 'redux-saga';
import request from '../utils/request';
import axios from 'axios/index';
import { setOrdersList } from '../actions/dashboard';



function* internalListener(socket) {
  while (true) {
    const data = yield take('EXE_COMMAND');
    socket.send(JSON.stringify({ type: '', status: '' }));
  }
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    // yield put(action);
    console.log('acttt ======>', action.item);
  }
}

function watchMessages(socket, request) {
  return eventChannel((emit) => {
    socket.onopen = (i) => {
      console.log('------------> OPEN', i);
      console.log('------------> REQ', request);
      // socket.send(JSON.stringify(request)); // Send data to server
    };
    socket.onmessage = (event) => {
      // console.log('msssg', event)
      const msg = JSON.parse(event.data);
      // console.log('===> msssg', msg)
      if (msg.Cmd === 'CreateSession.txt' && msg.SessionId) {
        console.log('WS SessionId:', msg.SessionId)
        return socket.send(JSON.stringify({ ...request, SessionId: msg.SessionId }));
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
    const request = {
      Cmd: 'Subscribe.txt',
      SessionId: '',
      Keys: ETNACredentials.accountId,
      // Symbol: 'GOOG, HAIR',
      EntityType: 'Order',
      HttpClientType: 'WebSocket',
    };
    // const socket = new WebSocket(`${ETNACredentials.dataUrl}/CreateSession.txt?${query}`);
    const socketQuotes = new WebSocket(`${ETNACredentials.quoteUrl}/CreateSession.txt?${queryQuote}`);
    console.log(' ** SOCKET', socketQuotes);
    // const socketChannel = yield call(watchMessages, socket, request);
    const quoteChannel = yield call(watchMessages, socketQuotes, { ...request, Keys: 7, EntityType: 'Quote' });
    const { cancel } = yield race({
      task: [
        // call(externalListener, socketChannel),
        call(externalListener, quoteChannel),
        // call(internalListener, socket)
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

function* get_orders_list() {
  const ETNACredentials = yield select(state => (
    state.dashboard.userData ? state.dashboard.userData.data.etna_credentials : {}));
  const url = `${etnaConfig.api_path}/orders_list_page`;
  const params = {
    method: 'POST',
    data: {
      ticket: ETNACredentials.ticket,
      // pageNumber: 0,
      accountId: 6,
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
  console.log('55555', url, params)
  const res = yield getENTAData(url, params);
  console.log(res.data.Result)
  yield put(setOrdersList(res.data.Result.Orders));
}

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

/*  --------- ETNA TEST API FUNCTIONS  END ---------- */

export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(LOGOUT, logout),
    takeEvery(GET_ORDERS_LIST, get_orders_list),
    wsHandling(),
  ]);
}


