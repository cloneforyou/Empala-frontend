/* global fetch */

import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import profileSaga from './saga/profile';
import registrationSaga from './saga/registration';
import dashboardSaga from './saga/dashboard';
import socketSaga from './saga/ETNASocketParser';
import {
  authenticate,
  changePassword,
  sendActivationLink,
  unblockAccount,
  twoFactorAuthentication,
  logout,
} from './saga/authentication';
import {
  CLEAR_REGISTRATION_DATA,
  LOGIN_REQUEST,
  PASSWORD_UPDATE_REQUEST,
  SEND_ACTIVATION_LINK_REQUEST,
  UNBLOCK_REQUEST,
  TWO_FACTOR_AUTHENTICATION,
} from './constants/auth';
import {
  LOGOUT
} from './constants/dashboard';


es6promise.polyfill();


function* clearLocalData() {
  yield delete localStorage.registrationData;
}

function* rootSaga() {
  yield all([
    registrationSaga(),
    dashboardSaga(),
    profileSaga(),
    socketSaga(),
    takeLatest(LOGIN_REQUEST, authenticate),
    takeLatest(SEND_ACTIVATION_LINK_REQUEST, sendActivationLink),
    takeLatest(UNBLOCK_REQUEST, unblockAccount),
    takeLatest(TWO_FACTOR_AUTHENTICATION, twoFactorAuthentication),
    takeLatest(PASSWORD_UPDATE_REQUEST, changePassword),
    takeEvery(CLEAR_REGISTRATION_DATA, clearLocalData),
    takeLatest(LOGOUT, logout),
  ]);
}

export default rootSaga;
