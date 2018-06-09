import { takeEvery, all, take, select, put, call } from 'redux-saga/effects';
import openSocket from 'socket.io-client';
import axios from 'axios';
import {
  DELETE_ACCOUNT_REQUEST,
  GET_USER_DATA_REQUEST,
  LOGOUT,
  UPLOAD_IMAGE_REQUEST ,
} from '../constants/dashboard';
import { getUserData, logout } from './authentication';
import { serverOrigins } from '../utils/config';
import request from '../utils/request';
import {
  deleteAccountFail,
  deleteAccountSuccess,
  uploadImageFail,
  uploadImageSuccess,
} from '../actions/dashboard';


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

function* uploadImage() {
  const accessToken = localStorage.getItem('accessToken');
  const data = yield select(state => state.dashboard.uploadableImage);
  const url = '/api/upload/avatar';
  const options = {
    headers: { 'x-access-token': accessToken },
    method: 'POST',
    data,
  };
  try {
    // console.log(' ** UPLOAD');
    const result = yield call(request, url, options);
    yield put(uploadImageSuccess());
  } catch (err) {
    yield put(uploadImageFail(err.message));
  }
}

function* accountDelete() {
  const accessToken = localStorage.getItem('accessToken');
  const url = 'http://localhost:9000/api/account/delete';
  const options = {
    headers: { 'x-access-token': accessToken },
    method: 'DELETE',
  };
  try {
    // console.log(' ** DELETE');
    const result = yield axios.delete(url, { headers: options.headers });
    yield put(deleteAccountSuccess());
    localStorage.removeItem('accessToken');
    window.location.assign('/');
  } catch (err) {
    yield put(deleteAccountFail(err.message));
  }
}



export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(UPLOAD_IMAGE_REQUEST, uploadImage),
    takeEvery(DELETE_ACCOUNT_REQUEST, accountDelete),
    takeEvery(LOGOUT, logout),
    wsHandling(),
  ]);
}
