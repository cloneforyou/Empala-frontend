import { call, put, takeLatest, select, takeEvery }  from 'redux-saga/effects';
import {setFieldInvalid, setFieldValid, setTabName, setTabPageIndex} from '../actions/registration';
import {CHANGE_TAB_PAGE_INDEX, SET_FIELD_VALUE} from "../constants/registration";
import { menuItems } from '../utils/registrationUtils';
import request from '../utils/request';


// function* changeTabIfBiggerThanItemsQuantity(tabIndex, tabName, nextTabName) {
//   if (tabIndex > menuItems[tabName].length-1) {
//     yield put(setTabName(nextTabName));
//     yield put(setTabPageIndex(1));
//   } else {
//     yield put(setTabPageIndex(+tabIndex + 1));
//   }
// }



export function* changeTabPage({tabName, tabIndex, direction}) {
  // const menuItems = yield select((state) => state.registration.menuItems);
  const nextTabs = {
    info: 'member',
    member: 'identity',
    identity: 'regulatory',
    regulatory: 'profile',
    profile: 'experience',
    experience: 'agreement'
  };
  const prevTabs = {
    identity: 'member',
    regulatory: 'identity',
    profile: 'regulatory',
    experience: 'profile',
    agreement: 'experience'
  };
  // console.log('SSSSSSSAAAAAAGGGGGGAAAA', tabName, tabIndex, direction, menuItems)
  if (direction === 'forward') {
      if (tabName === 'info'|| tabIndex > menuItems[tabName].length-1) {
        if (tabName === 'agreement') {return}
        yield put(setTabName(nextTabs[tabName]));
        yield put(setTabPageIndex(1));
      } else {
        yield put(setTabPageIndex(+tabIndex + 1));
      }
  } else if (direction === 'backward') {
    if (tabIndex <= 1) {
      if (tabName === 'member') {return}
      yield put(setTabName(prevTabs[tabName]));
      yield put(setTabPageIndex(menuItems[prevTabs[tabName]].length));
    } else {
      yield put(setTabPageIndex(tabIndex - 1));
    }
  }
}

export function* saveData() {
  const registrationData = yield select((state) => state.registration.registrationData);
  localStorage.setItem('registrationData', JSON.stringify(registrationData));
}


export function* validateFieldOnServer({id, value}) {
  console.log('oooooooooooo------------VAAAALIII', id, value)
  const validatedFields = ['member_email', 'member_passport_number', 'member_drivers_license_number'];

  const url = '/auth/check';
  const options = {
    method: 'POST',
    data: {
      id,
      value,
    }
  };
  if (validatedFields.includes(id)) {
    try {
      const result = yield call(request, url, options);
      yield put(setFieldValid(id));
    } catch (err) {
      yield put(setFieldInvalid(id, err.message));
    }
  }
}

export default function* registrationSaga() {
  yield [
    takeEvery(CHANGE_TAB_PAGE_INDEX, changeTabPage),
    takeEvery(SET_FIELD_VALUE, saveData),
    takeLatest(SET_FIELD_VALUE, validateFieldOnServer)
  ];
}