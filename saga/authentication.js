import {
  all,
  call,
  put,
  select,
} from 'redux-saga/effects';
import request from '../utils/request';
import {
  openModal,
  restartSessionTimeout,
  setAccessToken,
  setUserData,
  startSocket,
} from '../actions/dashboard';
import {
  cleanErrorMessage,
  loginFailed,
  loginSuccess,
  passwordUpdateFailed,
  passwordUpdateSuccess,
  sendActivationLinkFailed,
  sendActivationLinkSuccess,
  setAccountBlocked,
  toggleModal,
  setSocialLoginMfa,
  setLoginMfa,
  setSocialLoginData,
  setMfaLoginData,
  toggleCodeResend,
} from '../actions/auth';
import { setFieldInvalid } from '../actions/registration';
import { setColorScheme } from '../actions/dashboard';
import { selectETNADataRequest, getNews, sessionTimeout, getExternalNews } from './dashboard';


/* todo remove when actual data been available */
const allowedSectionsStub = [
  'overview',
  'positions',
  'performance',
  'cash',
  'orders',
  'profile',
  'market',
  'funding',
  'global portfolio',
];

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
    if (result.data.info === 'CODE_SENT') {
      yield put(loginSuccess());
      yield put(setLoginMfa());
      if (result.data.data) yield put(setMfaLoginData(result.data.data));
      // if (result.data.misc === 'SOCIAL') {
      //   yield put(setSocialLoginData(result.data.data));
      //   yield put(setSocialLoginMfa());
      //    }
    }
    if (result.data.info === 'RELATED_ACCOUNT_NOT_FOUND') {
      yield put(toggleModal());
      yield put(loginSuccess());
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
      yield put(loginFailed());
    } else yield put(loginFailed(err.message));
  }
}

export function* twoFactorAuthentication({ code }) {
  // const isSocialMFA = yield select(state => state.auth.socialLoginMfa);
  // let url = '/api/auth/login';
  const url = '/api/auth/mfa';
  // const login = yield select(state => state.auth.index_username);
  // const password = yield select(state => state.auth.index_password);
  const mfaData = yield select(state => state.auth.mfaLoginData);
  const options = {
    method: 'POST',
    data: {
      ...mfaData,
      code,
    },
  };
  // if (isSocialMFA) {
  //   const socialData = yield select(state => state.auth.socialLoginData);
  //   url += '/social';
  //   options.data = { ...socialData, code };
  // }
  try {
    const result = yield call(request, url, options);
    if (result.data.info === 'LOGGED_IN') {
      localStorage.setItem('accessToken', result.data.data.tokens.access);
      localStorage.setItem('refreshToken', result.data.data.tokens.refresh);
      yield put(loginSuccess());
      return window.location.assign('/dashboard');
    }
  } catch (err) {
    console.log(' Mfa err => ', err);
    if (err.message === 'Invalid security code') yield put(toggleCodeResend());
    if (err.message === 'Account suspended') {
      yield put(setAccountBlocked());
      yield put(cleanErrorMessage());
    }
    yield put(loginFailed(err.message));
  }
}

export function* authenticate({ provider, data }) {
  const login = yield select(state => state.auth.index_username);
  const password = yield select(state => state.auth.index_password);
  const mfaData = yield select(state => state.auth.mfaLoginData);
  // const isSocialMFA = yield select(state => state.auth.socialLoginMfa);
  // if (provider === 'resend') {
  //   if (isSocialMFA) {
  //     provider = yield select(state => state.auth.socialLoginData.provider);
  //   }
  // }
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
    case 'resend':
      url = '/api/auth/resend';
      options.data = mfaData;
      break;
    default:
      url = '/api/auth/login';
      options.data = {
        login,
        password,
      };
  }
  if (provider === 'local') {
    if (!(login && password)) {
      if (!login) {
        yield put(loginFailed());
        yield put(setFieldInvalid('index_username', 'Please provide member no. or e-mail'));
      }
      if (!password) {
        yield put(loginFailed());
        return yield put(setFieldInvalid('index_password', 'This field should\'n be blank'));
      }
      return false;
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
    localStorage.setItem('accessToken', tokens.data.data.access);
    localStorage.setItem('refreshToken', tokens.data.data.refresh);
    // window.location.assign('/dashboard');
  } catch (err) {
    console.log(' Token refresh error >>>', err);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.assign('/');
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
  } catch (err) {
    console.log(err.message);
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.assign('/');
}

function* getAccessToken() {
  const token = localStorage.getItem('accessToken');
  if (token) yield put(setAccessToken(token));
  return null;
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
    yield put(setColorScheme(data.data.data.profile.MemberPreferences.theme));
    yield getAccessToken();
    yield all([
      'orders_list',
      'watch_lists',
      'positions',
      'balance',
    ].map(list => call(selectETNADataRequest, { payloadType: list })));
    yield put(startSocket());
    if (data.data.data.profile.should_update_password) {
      yield put(openModal('passwordReminder'));
    }
    yield put(restartSessionTimeout());
    yield getExternalNews();
    yield getNews();
  } catch (err) {
    // console.log(' ** DASHBOARD ERROR =======>', err);
    if (err.message === 'Missing refresh token' || err.message === 'Refresh token expired') {
      localStorage.removeItem('refreshToken');
      window.location.assign('/');
    } else if (err.message === 'Missing access token' || err.message === 'Token expired') {
      localStorage.removeItem('accessToken');
      // yield refreshTokens();  // maybe needs later
      return window.location.assign('/');
    } else if (err.message === 'Account suspended') {
      localStorage.removeItem('accessToken');
      return window.location.assign('/');
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
