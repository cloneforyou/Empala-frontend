import { takeEvery, all, take, select, put, call } from 'redux-saga/effects';
import openSocket from 'socket.io-client';
import { GET_USER_DATA_REQUEST, UPLOAD_IMAGE_REQUEST } from '../constants/dashboard';
import { getUserData } from './authentication';
import { serverOrigins } from '../utils/config';
import request from "../utils/request";
import { uploadImageFail, uploadImageSuccess } from '../actions/dashboard';


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
  const data = yield select(state => state.dashboard.uploadableImage);
  const url = '/api/upload/avatar'
  const options = {
    method: 'POST',
    data,
  };
  try {
    console.log(' ** UPLOAD' );
    const result = yield call(request, url, options);
    yield put(uploadImageSuccess);
  } catch (err) {
    yield put(uploadImageFail(err.message));
  }
}

export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(UPLOAD_IMAGE_REQUEST, uploadImage),
    wsHandling(),
  ]);
}
