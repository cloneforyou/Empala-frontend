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
      'x-access-token': localStorage.getItem('accessToken'),
      'x-refresh-token': localStorage.getItem('refreshToken'),
    },
  };

  try {
    const data = yield call (request, url, options);
    yield put(setUserData(data))
  }
  catch(err) {
    console.log(' ** DASHBOARD ERROR =======>', err);
  }
}


