import { takeEvery, all } from 'redux-saga/effects';
import { GET_USER_DATA_REQUEST } from '../constants/dashboard';
import { getUserData } from './authentication';
//
// function* wsHandling() {
//   while (true) {
//     const data = yield take('START_WEBSOCKET');
//     const socket = new WebSocket('');
//     const socketChannel = yield call(watchMessages, socket);
//     const { cancel } = yield race({
//       task: [call(externalListener, socketChannel), call(internalListener, socket)],
//       cancel: take('STOP_WEBSOCKET')
//     });
//     if (cancel) {
//       socketChannel.close();
//     }
//   }
// }
//
// function* internalListener(socket) {
//   while (true) {
//     // const data = yield take('');
//     // socket.send(JSON.stringify({ type: '', status: '' }))
//   }
// }

export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
  ]);
}
