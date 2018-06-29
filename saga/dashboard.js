import { takeEvery, all, take, select, put, call, race } from 'redux-saga/effects';
import openSocket from 'socket.io-client';
import {
  GET_USER_DATA_REQUEST,
  LOGOUT,
} from '../constants/dashboard';
import { getUserData, logout } from './authentication';
import { serverOrigins } from '../utils/config';
import { eventChannel } from 'redux-saga';



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
    const request = {
      Cmd: 'Subscribe.txt',
      SessionId: '',
      Keys: ETNACredentials.accountId,
      // Symbol: 'GOOG, HAIR',
      EntityType: 'Order',
      HttpClientType: 'WebSocket',
    };
    const socket = new WebSocket(`${ETNACredentials.dataUrl}/CreateSession.txt?${query}`);
    console.log(' ** SOCKET', socket);
    const socketChannel = yield call(watchMessages, socket, request);
    const { cancel } = yield race({
      task: [call(externalListener, socketChannel), call(internalListener, socket)],
      cancel: take('STOP_WEBSOCKET'),
    });
    if (cancel) {
      socketChannel.close();
    }
  }
}



export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(LOGOUT, logout),
    wsHandling(),
  ]);
}


