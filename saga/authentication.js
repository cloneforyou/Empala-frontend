import {call, put, takeLatest, select, takeEvery, all} from 'redux-saga/effects';
import request from '../utils/request';
import {setUserData} from "../actions/dashboard";


export function* authenticate({login, password}) {
  const url = '/api/auth/login';
  const options = {
    method: 'GET',
    data: {
      login,
      password,
    },
  };
  try {

  }
  catch(err) {

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
    const data = yield call (request, url, options);
    yield put(setUserData(data.data));
  }
  catch(err) {
    // console.log(' ** DASHBOARD ERROR =======>', err);
    if (err.message === 'Missing refresh token' || err.message === 'Refresh token expired') {
      location.assign('/');
    } else if (err.message === 'Missing access token' || err.message === 'Token expired' ) {
      yield refreshTokens();
    }
  }
}


export function* refreshTokens() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const tokens = yield call(request,
      '/api/auth/refresh',
      {
        method: 'GET',
        headers:
          {'x-refresh-token': refreshToken},
      }
    );

    localStorage.setItem('accessToken', tokens.data.tokens['access']);
    localStorage.setItem('refreshToken',tokens.data.tokens['refresh']);
    location.assign('/dashboard');
  }
  catch(err) {
    location.assign('/');
  }
}
