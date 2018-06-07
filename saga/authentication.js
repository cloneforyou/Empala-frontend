import { call, put, takeLatest, select, takeEvery, all } from 'redux-saga/effects';
import request from '../utils/request';
import { setUserData } from '../actions/dashboard';
import {loginFailed, loginSuccess} from "../actions/login";


export function* authenticate() {
  const email = yield select(state => state.reducer.index_username);
  const password = yield select(state => state.reducer.index_password);
  console.log(' ** AUTH', email, password);
  const url = '/api/auth/login';
  const options = {
    method: 'POST',
    data: {
      email,
      password,
    },
  };
  try {
    const result = yield call(request, url, options);
    console.log(' ** ', result);
    yield put(loginSuccess());
    localStorage.setItem('accessToken', result.data.data.tokens.access);
    localStorage.setItem('refreshToken', result.data.data.tokens.refresh);
    window.location.assign('/dashboard');
  } catch (err) {
    // console.log(' ** ', err);
    yield put(loginFailed(err.message));
  }
}

export function* refreshTokens() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const tokens = yield call(
      request,
      '/api/auth/refresh',
      {
        method: 'GET',
        headers:
          { 'x-refresh-token': refreshToken },
      },
    );

    localStorage.setItem('accessToken', tokens.data.tokens.access);
    localStorage.setItem('refreshToken', tokens.data.tokens.refresh);
    window.location.assign('/dashboard');
  } catch (err) {
    console.log(' ** ', err);
    location.assign('/');
  }
}

export function* getUserData() {
  const url = '/api/dashboard';
  const options = {
    method: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };

  try {
    const data = yield call(request, url, options);
    yield put(setUserData(data.data));
  } catch (err) {
    // console.log(' ** DASHBOARD ERROR =======>', err);
    if (err.message === 'Missing refresh token' || err.message === 'Refresh token expired') {
      window.location.assign('/');
    } else if (err.message === 'Missing access token' || err.message === 'Token expired') {
      yield refreshTokens();
    }
  }
}

