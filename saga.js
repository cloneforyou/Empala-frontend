/* global fetch */

import { all, takeLatest, takeEvery } from 'redux-saga/effects';
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
  CLEAR_REGISTRATION_DATA,
  LOGIN_REQUEST,
  PASSWORD_UPDATE_REQUEST,
  SEND_ACTIVATION_LINK_REQUEST,
  UNBLOCK_REQUEST,
} from './constants/auth';
import { UPDATE_PROFILE_REQUEST } from './constants/profile';
import { sendProfileData } from './saga/profile';


es6promise.polyfill();


function* clearLocalData() {
  yield delete localStorage.registrationData;
}

function* rootSaga() {
  yield all([
    registrationSaga(),
    dashboardSaga(),
    takeLatest(LOGIN_REQUEST, authenticate),
    takeLatest(SEND_ACTIVATION_LINK_REQUEST, sendActivationLink),
    takeLatest(UNBLOCK_REQUEST, unblockAccount),
    takeLatest(PASSWORD_UPDATE_REQUEST, changePassword),
    takeLatest(UPDATE_PROFILE_REQUEST, sendProfileData),
    takeEvery(CLEAR_REGISTRATION_DATA, clearLocalData),
  ]);
}

export default rootSaga;
