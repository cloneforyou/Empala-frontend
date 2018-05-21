import {call, put, takeLatest, select, takeEvery, all} from 'redux-saga/effects';
import {GET_USER_DATA_REQUEST} from "../constants/dashboard";
import { getUserData } from "./authentication";

export default function* dashboardSaga() {
  yield all([
    takeEvery(GET_USER_DATA_REQUEST, getUserData),
  ])
}
