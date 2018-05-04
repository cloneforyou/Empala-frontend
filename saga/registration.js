import { call, put, takeLatest, select, takeEvery }  from 'redux-saga/effects';
import {setTabName, setTabPageIndex} from '../actions/registration';
import {CHANGE_TAB_PAGE_INDEX} from "../constants/registration";
import { menuItems } from '../utils/registrationUtils';


function* changeTabIfBiggerThanItemsQuantity(tabIndex, tabName, nextTabName) {
  if (tabIndex > menuItems[tabName].length-1) {
    yield put(setTabName(nextTabName));
    yield put(setTabPageIndex(1));
  } else {
    yield put(setTabPageIndex(+tabIndex + 1));
  }
}



export function* changeTabPage({tabName, tabIndex, direction}) {
  // const menuItems = yield select((state) => state.registration.menuItems);
  const nextTabs = {
    'member': 'identity',
    'identity': 'account',
    'account': 'approvals',
  };
  const prevTabs = {
    'identity': 'member',
    'account': 'identity',
    'approvals': 'account',
  };
  // console.log('SSSSSSSAAAAAAGGGGGGAAAA', tabName, tabIndex, direction, menuItems)
  if (direction === 'forward') {
      if (tabIndex > menuItems[tabName].length-1) {
        if (tabName === 'approvals') {return};
        yield put(setTabName(nextTabs[tabName]));
        yield put(setTabPageIndex(1));
      } else {
        yield put(setTabPageIndex(+tabIndex + 1));
      }
  } else if (direction === 'backward') {
    if (tabIndex <= 1) {
      if (tabName === 'member') {return};
      yield put(setTabName(prevTabs[tabName]));
      yield put(setTabPageIndex(menuItems[prevTabs[tabName]].length));
    } else {
      yield put(setTabPageIndex(tabIndex - 1));
    }
  }
}

export default function* registrationSaga() {
  yield [
    takeEvery(CHANGE_TAB_PAGE_INDEX, changeTabPage),
  ];
}