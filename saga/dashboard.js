import { takeEvery, all, take, select, put, call } from 'redux-saga/effects';
import openSocket from 'socket.io-client';
import {
  DELETE_ACCOUNT_REQUEST,
  GET_USER_DATA_REQUEST,
  LOGOUT,
  UPLOAD_IMAGE_REQUEST,
} from '../constants/dashboard';
import { getUserData, logout } from './authentication';
import { serverOrigins } from '../utils/config';
import request from '../utils/request';
import { accountDelete, uploadImage } from './profile';


function* wsHandling() {
  while (true) {
    const data = yield take('START_WEBSOCKET');
    const socket = openSocket(serverOrigins.aws, {
      query: { token: localStorage.getItem('accessToken') },
    });
    // console.log(' ** SOCKET', socket);
    // const socketChannel = yield call(watchMessages, socket);
    // const { cancel } = yield race({
    //   task: [call(externalListener, socketChannel), call(internalListener, socket)],
    //   cancel: take('STOP_WEBSOCKET')
    // });
    // if (cancel) {
    //   socketChannel.close();
    // }
  }
}

// function* internalListener(socket) {
//   while (true) {
//     // const data = yield take('');
//     // socket.send(JSON.stringify({ type: '', status: '' }))
//   }
// }


export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(UPLOAD_IMAGE_REQUEST, uploadImage),
    takeEvery(DELETE_ACCOUNT_REQUEST, accountDelete),
    takeEvery(LOGOUT, logout),
    wsHandling(),
  ]);
}
