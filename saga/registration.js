import { call, put, takeLatest, select}  from 'redux-saga/effects';
import { takeEvery } from "redux-saga";
import {setTabName, setTabPageIndex} from "../actions/registration";
import {CHANGE_TAB_PAGE_INDEX} from "../constants/registration";
import Router from 'next/router'





export function* changeTabPage({tabName, tabIndex, direction}) {
  const menuItems = yield select((state) => state.registration.menuItems);

  console.log('SSSSSSSAAAAAAGGGGGGAAAA', tabName, tabIndex, direction, menuItems)
  if (direction === 'forward') {
    // yield put(setTabPageIndex(+tabIndex + 1));
    if (tabName === 'member') {
      if (tabIndex > menuItems.length-1) {
        yield put(setTabName('identity'));
        yield put(setTabPageIndex(1));
      } else {
        yield put(setTabPageIndex(+tabIndex + 1));
      }
    } else if (tabName === 'identity') {
      yield put(setTabPageIndex(+tabIndex + 1));
    }
    // switch (tabName) {
    //   case 'member':
    //     if (tabIndex > menuItems.length - 1) {
    //       yield put(setTabName('identity'));
    //       console.log(123123123)
    //       yield put(setTabPageIndex(1));
    //     }
    //   case 'identity':
    //     if (tabIndex <= 1 && direction === 'backward') {
    //       yield put(setTabPageIndex(2));
    //       yield put(setTabName('member'));
    //     }
    //     yield put(setTabPageIndex(+tabIndex + 1));
    // }
  } else if (direction === 'backward') {
    if (tabName === 'member') {
      if (tabIndex <= 1) {
        yield put(setTabPageIndex(3))
      } else {
        yield put(setTabPageIndex(tabIndex - 1));
      }
    } else if (tabName === 'identity') {
      if (tabIndex <= 1) {
        yield put(setTabName('member'));
      } else {
        yield put(setTabPageIndex(tabIndex - 1));
      }
    }
    // switch (tabName) {
    //   case 'member':
    //     if (tabIndex <= 1) {
    //       yield put(setTabPageIndex(3))
    //     }
    //     else yield put(setTabPageIndex(tabIndex - 1));
    // }
  }
}

export default function* registrationSaga() {
  yield [
    takeEvery(CHANGE_TAB_PAGE_INDEX, changeTabPage),
  ];
}