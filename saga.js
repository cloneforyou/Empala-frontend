/* global fetch */

import {delay} from 'redux-saga'
import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import registrationSaga from './saga/registration'


es6promise.polyfill();


function * rootSaga () {
  yield all(
      [
        registrationSaga(),
      ]
  )
}

export default rootSaga
