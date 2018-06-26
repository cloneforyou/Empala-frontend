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
  passwordUpdateFailed,
  passwordUpdateSuccess,
  sendActivationLinkFailed,
  sendActivationLinkSuccess,
  setAccountBlocked, toggleModal,
} from '../actions/auth';
import { setFieldInvalid } from '../actions/registration';


function* loginRequest(url, options) {
  // console.log(url, options)
  try {
    const result = yield call(request, url, options);
    if (result.data.info === 'LOGGED_IN') {
      yield put(loginSuccess());
      localStorage.setItem('accessToken', result.data.data.tokens.access);
      localStorage.setItem('refreshToken', result.data.data.tokens.refresh);
      return window.location.assign('/dashboard');
    }
    if (result.data.info === 'RELATED_ACCOUNT_NOT_FOUND') {
      yield put(toggleModal());
      const registrationData = {
        member_basic_information_first_name: result.data.data.given_name || result.data.data.first_name || '',
        member_basic_information_last_name: result.data.data.family_name || result.data.data.last_name || '',
        member_account_email: result.data.data.email || '',
      };
      if (result.data.data.hometown) {
        const memberTown = result.data.data.hometown.name.split(',');
        registrationData.identity_residential_address_residential_address_city = memberTown[0];
        // registrationData.identity_residential_address_residential_address_country = memberTown[1]; // Enable on next phase
      }
      if (result.data.data.country) {
        // registrationData.identity_residential_address_residential_address_country = country.name; // Enable on next phase
      }
      localStorage.setItem('registrationData', JSON.stringify({ ...localStorage.getItem('registrationData'), ...registrationData }));
    }
  } catch (err) {
    console.log(' ** ', err);
    if (err.message === 'Account suspended') {
      yield put(setAccountBlocked());
      yield put(cleanErrorMessage());
    } else yield put(loginFailed(err.message));
  }
}

export function* authenticate({ provider, data }) {
  const login = yield select(state => state.auth.index_username);
  const password = yield select(state => state.auth.index_password);
  // console.log(' ** AUTH', provider, data);
  let url = '';
  const options = {
    method: 'POST',
    data: {
      login,
      password,
    },
  };
  switch (provider) {
    case 'google':
      url = '/api/auth/login/google';
      options.data = {
        token: data,
      };
      break;
    case 'facebook':
      url = '/api/auth/login/facebook';
      options.data = {
        userData: data,
      };
      break;
    case 'linkedIn':
      url = '/api/auth/login/linkedin';
      options.data = {
        userData: data,
      };
      break;
    default:
      url = '/api/auth/login';
      options.data = {
        login,
        password,
      };
  }
  if (provider === 'local') {
    if (!login) {
      yield put(setFieldInvalid('index_username', 'Please provide member no. or e-mail'));
    }
    if (!password) {
      return yield put(setFieldInvalid('index_password', 'This field should\'n be blank'));
    }
  }
  yield loginRequest(url, options);
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
    // console.log(' ** ', err);
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

export function* unblockAccount({ code }) {
  // console.log(' ** UNBLOCK', code);
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

export function* changePassword({ password, code }) {
  // console.log(' ** RESET', code);
  const url = '/api/auth/recovery/verify';
  const options = {
    method: 'POST',
    data: {
      code,
      password,
    },
  };
  if (code) {
    try {
      const result = yield call(request, url, options);
      // console.log(' ** ', result);
      yield put(passwordUpdateSuccess());
      yield put(cleanErrorMessage());
      setTimeout(() => window.location.assign('/'), 3000);
    } catch (err) {
      // console.log(' ** ', err);
      yield put(passwordUpdateFailed(err.message));
    }
  }
}

export function* sendActivationLink({ operation }) {
  const email = yield select(state => state.auth.index_email);
  // console.log(' ** SEND Link', email);
  const urls = {
    unblockAccount: '/api/auth/unblock/send',
    passwordRecovery: '/api/auth/recovery/send',
  };
  const options = {
    method: 'POST',
    data: {
      email,
    },
  };
  if (email) {
    try {
      const result = yield call(request, urls[operation], options);
      // console.log(' ** ', result);
      yield put(sendActivationLinkSuccess());
      yield put(cleanErrorMessage());
    } catch (err) {
      // console.log(' ** ', err);
      yield put(sendActivationLinkFailed(err.message));
    }
  }
}
