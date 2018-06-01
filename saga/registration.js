import { call, put, takeLatest, select, takeEvery, all } from 'redux-saga/effects';
import _ from 'lodash';
import {
  registrationFail, setInputFieldValueById,
  setTabName,
  setTabPageIndex,
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
} from '../constants/registration';
import { menuItems } from '../utils/registrationUtils';
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
  const url = '/api/auth/register';
  const options = {
    method: 'POST',
    data: registrationData,
  };

  try {
    const response = yield call(request, url, options);
    localStorage.setItem('accessToken', response.data.data.tokens.access);
    localStorage.setItem('refreshToken', response.data.data.tokens.refresh);
    location.assign('/dashboard');
  } catch (err) {
    yield put(registrationFail(err.response ? err.response.data.info : 'Network error'));
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
    takeLatest(REGISTRATION_SUBMIT_REQUEST, sendRegistrationForm),
    takeLatest(VALIDATE_FIELDS_BLANK, validateEmptyFields),
  ]);
}

