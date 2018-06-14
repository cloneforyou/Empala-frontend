/* global fetch */

import { all, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import registrationSaga from './saga/registration';
import dashboardSaga from './saga/dashboard';
import {
  authenticate,
  changePassword,
  sendActivationLink,
  unblockAccount,
} from './saga/authentication';
import {
  LOGIN_REQUEST,
  PASSWORD_UPDATE_REQUEST,
  SEND_ACTIVATION_LINK_REQUEST,
  UNBLOCK_REQUEST,
} from './constants/auth';


es6promise.polyfill();


function* rootSaga() {
  yield all([
    registrationSaga(),
    dashboardSaga(),
    takeLatest(LOGIN_REQUEST, authenticate),
    takeLatest(SEND_ACTIVATION_LINK_REQUEST, sendActivationLink),
    takeLatest(UNBLOCK_REQUEST, unblockAccount),
    takeLatest(PASSWORD_UPDATE_REQUEST, changePassword),
  ]);
}

export default rootSaga;
