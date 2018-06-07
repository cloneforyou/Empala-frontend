/* global fetch */

import { delay } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import registrationSaga from './saga/registration';
import dashboardSaga from './saga/dashboard';
import { authenticate } from './saga/authentication';


es6promise.polyfill();


function* rootSaga() {
  yield all([
    registrationSaga(),
    dashboardSaga(),
    takeLatest('LOGIN_REQUEST', authenticate),
  ]);
}

export default rootSaga;
