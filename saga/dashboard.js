import { takeEvery, all, take, select, put, call, race, fork, spawn } from 'redux-saga/effects';
import {
  GET_ETNA_DATA,
  GET_USER_DATA_REQUEST,
  LOGOUT,
} from '../constants/dashboard';
import { getUserData, logout } from './authentication';
import { serverOrigins } from '../utils/config';
import { eventChannel } from 'redux-saga';
import request from '../utils/request';
import axios from 'axios/index';
import {
  modifyPosition,
  setOrdersList,
  setPositions,
  setWatchLists,
  updateOrders,
  updateWatchlist,
} from '../actions/dashboard';


/*  --------- ETNA TEST API FUNCTIONS ---------- */
const etnaConfig = {
  api_path: '/api/etna_test',
};

function* getENTAData(url, params) {
  if (url && params) {
    try {
      const res = yield call(request, url, params);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  }
}

function* get_orders_list(credentials) {
  const url = `${etnaConfig.api_path}/orders_list_page`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
      accountId: credentials.accountId,
      pageSize: 0,
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  if (res) yield put(setOrdersList(res.data.Result.Orders));
}

function* get_watchlists(credentials) {
  const url = `${etnaConfig.api_path}/watchlists`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  // console.log('waaaatttttchhhhhlist =>', res)
  if (res) yield put(setWatchLists(res.data.Result));
}

function* get_positions(credentials) {
  const url = `${etnaConfig.api_path}/get_positions`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
      accountId: credentials.accountId,
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  // console.log('poooooosiiiiiitiiiiiiooooooons =>', res)
  if (res) yield put(setPositions(res.data.Result));
}

function* get_balance(credentials) {
  const url = `${etnaConfig.api_path}/get_balance`;
  const params = {
    method: 'POST',
    data: {
      ticket: credentials.ticket,
      accountId: credentials.accountId,
      currency: 'USD', // further will get from store maybe
    },
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };
  const res = yield getENTAData(url, params);
  console.log('balance =>', res);
}

export function* selectETNADataRequest({ payloadType }) {
  const ETNACredentials = yield select(state => (
    state.dashboard.userData ? state.dashboard.userData.data.etna_credentials : {}));
  switch (payloadType) {
    case 'orders_list':
      yield get_orders_list(ETNACredentials);
      break;
    case 'watch_lists':
      yield get_watchlists(ETNACredentials);
      break;
    case 'positions':
      yield get_positions(ETNACredentials);
      break;
    case 'balance':
      yield get_balance(ETNACredentials);
      break;
    default: return false;
  }
  return false;
}

/*  --------- ETNA TEST API FUNCTIONS  END ---------- */

export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
    takeEvery(LOGOUT, logout),
    takeEvery(GET_ETNA_DATA, selectETNADataRequest),
  ]);
}


