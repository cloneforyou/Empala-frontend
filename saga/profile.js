import { call, put, select } from 'redux-saga/effects';
import request from '../utils/request';
import { updateProfileFail, updateProfileSuccess } from '../actions/profile';
import axios from 'axios/index';
import {
  deleteAccountFail,
  deleteAccountSuccess,
  uploadImageFail,
  uploadImageSuccess,
} from '../actions/dashboard';

export function* sendProfileData() {
  const profileData = yield select(state => state.profile.profileUserData);
  const url = '/api/account/update';
  const options = {
    method: 'PATCH',
    data: profileData,
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
  };

  try {
    const response = yield call(request, url, options);
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    yield put(updateProfileFail(err.message));
  }
}


export function* uploadImage() {
  const accessToken = localStorage.getItem('accessToken');
  const data = yield select(state => state.dashboard.uploadableImage);
  const url = '/api/upload/avatar';
  const options = {
    headers: { 'x-access-token': accessToken },
    method: 'POST',
    data,
  };
  try {
    // console.log(' ** UPLOAD');
    const result = yield call(request, url, options);
    yield put(uploadImageSuccess());
  } catch (err) {
    yield put(uploadImageFail(err.message));
  }
}

export function* accountDelete() {
  const accessToken = localStorage.getItem('accessToken');
  const url = 'http://localhost:9000/api/account/delete';
  const options = {
    headers: { 'x-access-token': accessToken },
    method: 'DELETE',
  };
  try {
    // console.log(' ** DELETE');
    const result = yield axios.delete(url, { headers: options.headers });
    yield put(deleteAccountSuccess());
    localStorage.removeItem('accessToken');
    window.location.assign('/');
  } catch (err) {
    yield put(deleteAccountFail(err.message));
  }
}