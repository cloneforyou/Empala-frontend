import {
  call,
  put,
  select,
} from 'redux-saga/effects';
import request from '../utils/request';
import { setUserData } from '../actions/dashboard';
import {
  cleanErrorMessage,
  loginFailed,
  loginSuccess,
  sendActivationLinkFailed,
  sendActivationLinkSuccess,
  setAccountBlocked,
} from '../actions/auth';


export function* authenticate() {
  const email = yield select(state => state.auth.index_username);
  const password = yield select(state => state.auth.index_password);
  console.log(' ** AUTH', email, password);
  const url = '/api/auth/login';
  const options = {
    method: 'POST',
    data: {
      email,
      password,
    },
  };
  if (email && password) {
    try {
      const result = yield call(request, url, options);
      // console.log(' ** ', result);
      yield put(loginSuccess());
      localStorage.setItem('accessToken', result.data.data.tokens.access);
      localStorage.setItem('refreshToken', result.data.data.tokens.refresh);
      window.location.assign('/dashboard');
    } catch (err) {
      console.log(' ** ', err);
      if (err.message === 'Account suspended') {
        yield put(setAccountBlocked());
        yield put(cleanErrorMessage());
      } else yield put(loginFailed(err.message));
    }
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
    window.location.assign('/');
    localStorage.removeItem('refreshToken');
  }
}

export function* logout() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const url = '/api/auth/logout';
  const options = {
    headers: {
      'x-access-token': accessToken,
      'x-refresh-token': refreshToken,
    },
    method: 'GET',
  };
  try {
    const result = yield call(request, url, options);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.assign('/');
  } catch (err) {
    console.log(err.message);
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
      localStorage.removeItem('refreshToken');
      window.location.assign('/');
    } else if (err.message === 'Missing access token' || err.message === 'Token expired') {
      localStorage.removeItem('accessToken');
      yield refreshTokens();
    }
  }
}

export function* unblockAccount({code}) {
  console.log(' ** UNBLOCK', code);
  const url = '/api/auth/unblock/verify';
  const options = {
    method: 'POST',
    data: {
      code,
    },
  };
  if (code) {
    try {
      const result = yield call(request, url, options);
      // console.log(' ** ', result);
      yield put(loginSuccess());
      yield put(cleanErrorMessage());
    } catch (err) {
      // console.log(' ** ', err);
      yield put(loginFailed(err.message));
    }
  }
}

export function* sendActivationLink() {
  const email = yield select(state => state.auth.index_email);
  console.log(' ** SEND Link', email);
  const url = '/api/auth/unblock/send';
  const options = {
    method: 'POST',
    data: {
      email,
    },
  };
  if (email) {
    try {
      const result = yield call(request, url, options);
      // console.log(' ** ', result);
      yield put(sendActivationLinkSuccess());
      yield put(cleanErrorMessage());
    } catch (err) {
      // console.log(' ** ', err);
      yield put(sendActivationLinkFailed(err.message));
    }
  }
}
