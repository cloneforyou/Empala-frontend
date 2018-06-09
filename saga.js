/* global fetch */

import { delay } from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import registrationSaga from './saga/registration';
import dashboardSaga from './saga/dashboard';
import {authenticate, unblockAccount} from './saga/authentication';
import {LOGIN_REQUEST, UNBLOCK_REQUEST} from "./constants/auth";


es6promise.polyfill();


function* rootSaga() {
  yield all([
    registrationSaga(),
    dashboardSaga(),
    takeLatest(LOGIN_REQUEST, authenticate),
    takeLatest(UNBLOCK_REQUEST, unblockAccount),
  ]);
}

export default rootSaga;
