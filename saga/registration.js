import { call, put, takeLatest, select, takeEvery, all } from 'redux-saga/effects';
import _ from 'lodash';
import {
  failUserID,
  registrationFail,
  setInputFieldValueById,
  setTabName,
  setTabPageIndex, setUserID,
  verifySendSuccess,
} from '../actions/registration';
import {
  CHANGE_TAB_PAGE_INDEX,
  SET_FIELD_VALUE,
  TOGGLE_CHECKBOX,
  VALIDATE_FIELDS_BLANK,
  REGISTRATION_SUBMIT_REQUEST,
  COPY_MAILING_ADDRESS,
  ADDRESS_INFO_REQUEST,
  SET_MEMBER_DOCUMENT_TYPE,
  VALIDATE_FIELD_VALUE,
  GET_USER_ID_REQUEST,
  VERIFY_SEND_REQUEST,
  VERIFY_SEND_SUCCESS,
} from '../constants/registration';
import { menuItems, traceError } from '../utils/registrationUtils';
import request from '../utils/request';
import validationSaga, { validateCheckbox, validateEmptyFields, validateFieldValue } from './validation';
import { getAddressInfoByZIP } from './sideServices';

export function* changeTabPage({ tabName, tabIndex, direction }) {
  const mailingAddressSameAsResidential = yield select(state =>
    state.registration.checkboxes.identity_residential_address_same_mailing_address_checkbox);
  const nextTabs = {
    info: 'member',
    member: 'identity',
    identity: 'regulatory',
    regulatory: 'profile',
    profile: 'experience',
    experience: 'final_review',
    final_review: 'agreement',
  };
  const prevTabs = {
    member: 'info',
    identity: 'member',
    regulatory: 'identity',
    profile: 'regulatory',
    experience: 'profile',
    final_review: 'experience',
    agreement: 'final_review',
  };
  if (direction === 'forward') {
    if (tabName === 'identity' && tabIndex === 1 && mailingAddressSameAsResidential) {
      yield put(setTabPageIndex(3));
      return false;
    }
    if (tabName === 'info' || tabName === 'final_review') {
      yield put(setTabName(nextTabs[tabName]));
      return false;
    }
    if (tabName !== 'info' && tabIndex > menuItems[tabName].length - 1) {
      if (tabName === 'agreement') {
        return false;
      }
      yield put(setTabName(nextTabs[tabName]));
      yield put(setTabPageIndex(1));
    } else {
      yield put(setTabPageIndex(+tabIndex + 1));
    }
  } else if (direction === 'backward') {
    if (tabIndex <= 1) {
      if (tabName === 'info') {
        return false;
      }
      yield put(setTabName(prevTabs[tabName]));
      yield put(setTabPageIndex((tabName === 'member' || tabName === 'agreement') ? 1 : menuItems[prevTabs[tabName]].length));
    } else {
      yield put(setTabPageIndex(tabIndex - 1));
    }
  }
}

export function* clearMemberDocumentInfo({ document }) {
  const data = yield select(state => state.registration.registrationData);
  let clearedFields = [];
  if (document === 'passport') {
    clearedFields = Object.keys(data).filter(key => (/member_drivers_license/.test(key)));
  } else if (document === 'drivers_license') {
    clearedFields = Object.keys(data).filter(key => (/member_passport/.test(key)));
  }
  yield all(clearedFields.map(field => put(setInputFieldValueById(field, ''))));
}

export function* saveData() {
  const registrationData = yield select(state => _.cloneDeep(state.registration.registrationData));
  registrationData.member_account_password = '';
  registrationData.member_account_password_confirm = '';
  localStorage.setItem('registrationData', JSON.stringify(registrationData));
}

export function* sendRegistrationForm() {
  const registrationData = yield select(state => state.registration.registrationData);
  const id = localStorage.getItem('id');
  const url = '/api/auth/register';
  const options = {
    method: 'POST',
    data: { ...registrationData, id },
  };

  try {
    const response = yield call(request, url, options);
    localStorage.setItem('accessToken', response.data.data.tokens.access);
    localStorage.setItem('refreshToken', response.data.data.tokens.refresh);
    window.location.assign('/dashboard');
  } catch (err) {
    yield put(registrationFail(traceError(err)));
  }
}

export function* getUserID() {
  const id = localStorage.getItem('id');
  const url = `/api/auth/register?id=${id}`;
  const options = {
    method: 'GET',
  };
  try {
    const res = yield call(request, url, options);
    yield put(setUserID(res.data.data.id));
    localStorage.setItem('id', res.data.data.id);
    yield put(setInputFieldValueById('member_account_account_no', res.data.data.id));
  } catch (err) {
    yield put(failUserID(`Sorry, the registration is unavailable right now. ${err.message}`));
  }
}

export function* verifySendRequest() {
  const id = localStorage.getItem('id');
  const url = '/api/auth/email/send';
  const options = {
    method: 'POST',
    data: {
      email: 'i.martyshko@dunice.net',
      id: '2',
    },
  };

  try {
    const res = yield call(request, url, options);
    console.log('verifySendRequest res -==> ', res);
    if (res.status === '200') {
      console.log('ok -==> ',);
    }

    yield put(verifySendSuccess());
  } catch (err) {
    console.log('verifySendRequest ERR -==> ', err);
  }
}

export default function* registrationSaga() {
  yield all([
    takeEvery(CHANGE_TAB_PAGE_INDEX, changeTabPage),
    takeEvery(ADDRESS_INFO_REQUEST, getAddressInfoByZIP),
    takeEvery([SET_FIELD_VALUE, COPY_MAILING_ADDRESS], saveData),
    takeEvery(TOGGLE_CHECKBOX, validateCheckbox),
    takeEvery(SET_MEMBER_DOCUMENT_TYPE, clearMemberDocumentInfo),
    takeEvery(VALIDATE_FIELD_VALUE, validateFieldValue),
    takeLatest(SET_FIELD_VALUE, validationSaga),
    takeLatest(GET_USER_ID_REQUEST, getUserID),
    takeLatest(REGISTRATION_SUBMIT_REQUEST, sendRegistrationForm),
    takeLatest(VALIDATE_FIELDS_BLANK, validateEmptyFields),
    takeLatest(VERIFY_SEND_REQUEST, verifySendRequest),
    // takeLatest(VERIFY_SEND_SUCCESS, verifySendSuccess),
  ]);
}

