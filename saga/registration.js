import { call, put, takeLatest, select, takeEvery, all } from 'redux-saga/effects';
import _ from 'lodash';
import {
  failUserID,
  registrationFail,
  setInputFieldValueById,
  setTabName,
  setTabPageIndex, setUserID,
  verifySendSuccess,
  verifySendFailure,
  sendCodeVerifySuccess,
  sendCodeVerifyFailure,
  showPopupPIN, registrationSuccess,
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
  SEND_CODE_VERIFY,
  CHECK_EMAIL_VERIFICATION,
} from '../constants/registration';
import { menuItems, traceError } from '../utils/registrationUtils';
import request from '../utils/request';
import validationSaga, { validateCheckbox, validateEmptyFields, validateFieldValue } from './validation';
import { getAddressInfoByZIP } from './sideServices';

export function* changeTabPage({ tabName, tabIndex, direction }) {
  if (!(tabName && tabIndex)) return;
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
    yield put(registrationSuccess());
    // window.location.assign('/');
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

export function* verifySendRequest(action) {
  const id = localStorage.getItem('id');
  const email = yield select(state => state.registration.registrationData.member_account_email ||
    state.profile.profileUserData.account_information_email);
  const phoneNumber = yield select(state => state.registration.registrationData.member_account_contact_phone);
  const url = `/api/auth/${action.entityType}/send`;
  const options = {
    method: 'POST',
    data: {
      email,
      number: phoneNumber && `+${phoneNumber.replace(/\D/g, "")}`,
      id,
    },
  };

  try {
    const res = yield call(request, url, options);
    yield put(verifySendSuccess());
  } catch (err) {
    yield put(verifySendFailure(err.message));
  }
}

export function* verifySendCodeRequest(action) {
  const id = localStorage.getItem('id');
  const code = yield select(state => state.registration.codeVerify);
  const url = `/api/auth/${action.entityType}/verify`;
  const options = {
    method: 'POST',
    data: {
      id,
      code,
    },
  };
  try {
    const res = yield call(request, url, options);
    yield put(sendCodeVerifySuccess());
    const tabName = yield select(state => state.registration.tabName);
    const tabIndex = yield select(state => state.registration.tabIndex);
    if (tabName && tabIndex) yield changeTabPage({ tabName, tabIndex, direction: 'forward' });
  } catch (err) {
    yield put(sendCodeVerifyFailure(err));
  }
}

export function* checkVerificationRequest(action) {
  const id = localStorage.getItem('id');
  const url = `/api/auth/${action.entityType}/check`;
  const options = {
    method: 'POST',
    data: {
      id,
    },
  };
  try {
    const res = yield call(request, url, options);
    if (res.data.info === 'NOT_VERIFIED') {
      if (res.data.misc === 'EMAIL_ADDRESS_IS_NOT_VERIFIED') {
        yield put(showPopupPIN('email'));
      } else if (res.data.misc === 'PHONE_NUMBER_IS_NOT_VERIFIED') {
        yield put(showPopupPIN('phone'));
      }
    } else if (res.data.info === 'VERIFIED') {
      const tabName = yield select(state => state.registration.tabName);
      const tabIndex = yield select(state => state.registration.tabIndex);
      yield changeTabPage({ tabName, tabIndex, direction: 'forward' });
    }
  } catch (err) {
    console.log('checkVerificationRequest ERR => ', err);
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
    takeLatest(SEND_CODE_VERIFY, verifySendCodeRequest),
    takeLatest(CHECK_EMAIL_VERIFICATION, checkVerificationRequest),
  ]);
}

