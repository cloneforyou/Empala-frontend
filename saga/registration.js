import {call, put, takeLatest, select, takeEvery, all} from 'redux-saga/effects';
import {registrationFail, setFieldInvalid, setFieldValid, setTabName, setTabPageIndex} from '../actions/registration';
import {
  CHANGE_TAB_PAGE_INDEX, SET_FIELD_VALUE, TOGGLE_CHECKBOX,
  VALIDATE_FIELDS_BLANK, REGISTRATION_SUBMIT_REQUEST
} from "../constants/registration";
import {menuItems} from '../utils/registrationUtils';
import request from '../utils/request';
import validationSaga from './validation';
import { validateCheckbox, validateEmptyFields } from './validation'


export function* changeTabPage({tabName, tabIndex, direction}) {
  // const menuItems = yield select((state) => state.registration.menuItems);
  const nextTabs = {
    info: 'member',
    member: 'identity',
    identity: 'regulatory',
    regulatory: 'profile',
    profile: 'experience',
    experience: 'final_review',
    final_review: 'agreement'
  };
  const prevTabs = {
    member: 'info',
    identity: 'member',
    regulatory: 'identity',
    profile: 'regulatory',
    experience: 'profile',
    final_review: 'experience',
    agreement: 'final_review'
  };
  if (direction === 'forward') {
    if (tabName === 'info' || tabName === 'final_review') {
      yield put(setTabName(nextTabs[tabName]));
      return
    }
    if (tabName !== 'info'  && tabIndex > menuItems[tabName].length - 1) {
      if (tabName === 'agreement') {
        return
    }
      yield put(setTabName(nextTabs[tabName]));
      yield put(setTabPageIndex(1));
    } else {
      yield put(setTabPageIndex(+tabIndex + 1));
    }
  } else if (direction === 'backward') {
    if (tabIndex <= 1) {
      if (tabName === 'info') {
        return
    }
      yield put(setTabName(prevTabs[tabName]));
      yield put(setTabPageIndex((tabName === 'member' || tabName === 'agreement') ? 1 : menuItems[prevTabs[tabName]].length));
    } else {
      yield put(setTabPageIndex(tabIndex - 1));
    }
  }
}

export function* saveData() {
  const registrationData = yield select((state) => state.registration.registrationData);
  localStorage.setItem('registrationData', JSON.stringify(registrationData));
}


export function* sendRegistrationForm() {
  console.log('-- REGISTRATION');
  const registrationData = yield select((state) => state.registration.registrationData);
  const url = '/auth/register';
  const options = {
    method: 'POST',
    data: registrationData,
  };

  try {
    const response = yield call(request, url, options);
    location.assign('/home');
  }
  catch(err) {
    yield put(registrationFail(err));
  }
}

export default function* registrationSaga() {
  yield all ([
    takeEvery(CHANGE_TAB_PAGE_INDEX, changeTabPage),
    takeEvery(SET_FIELD_VALUE, saveData),
    takeEvery(TOGGLE_CHECKBOX, validateCheckbox),
    takeLatest(SET_FIELD_VALUE, validationSaga),
    takeLatest(REGISTRATION_SUBMIT_REQUEST, sendRegistrationForm),
    takeLatest(VALIDATE_FIELDS_BLANK, validateEmptyFields)
  ]);
}
