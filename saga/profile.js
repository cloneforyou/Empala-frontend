import { call, put, select, all, takeLatest, takeEvery } from 'redux-saga/effects';
import request from '../utils/request';
import { resetPasswordFail, resetPasswordSuccess, updateProfileFail, updateProfileSuccess } from '../actions/profile';
import axios from 'axios/index';
import {
  deleteAccountFail,
  deleteAccountSuccess,
  uploadImageFail,
  uploadImageSuccess,
} from '../actions/dashboard';
import { cleanErrorMessage, passwordUpdateFailed, passwordUpdateSuccess } from '../actions/auth';
import { setFieldInvalid } from '../actions/registration';
import {CLEAR_REGISTRATION_DATA} from '../constants/auth';
import {RESET_PASSWORD_REQUEST, UPDATE_PROFILE_REQUEST} from '../constants/profile';
import {DELETE_ACCOUNT_REQUEST, UPLOAD_IMAGE_REQUEST} from '../constants/dashboard';

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

export function* resetPassword() {
  const password = yield select(state => state.profile.profileUserData.reset_password);
  const oldPassword = yield select(state => state.profile.profileUserData.reset_password_old);
  const passwordConfirm = yield select(state => state.profile.profileUserData.reset_password_confirm);
  // console.log(' ** RESET', code);
  const url = '/api/account/password';
  const options = {
    method: 'PATCH',
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
      'X-Refresh-Token': localStorage.getItem('refreshToken'),
    },
    data: {
      newPassword: password,
      oldPassword,
    },
  };
  if (!password || !passwordConfirm) {
    yield all(['reset_password', 'reset_password_confirm'].map(el =>
      put(setFieldInvalid(el, 'Please provide new password'))));
  }
  if (!oldPassword) {
    yield put(setFieldInvalid('reset_password_old', 'Type in old password'));
    return false;
  }
  try {
    const result = yield call(request, url, options);
    // console.log(' ** ', result);
    yield put(resetPasswordSuccess());
    yield put(cleanErrorMessage());
    setTimeout(() => window.location.assign('/'), 3000);
  } catch (err) {
    // console.log(' ** ', err);
    yield put(resetPasswordFail(err.message));
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
    yield put(uploadImageSuccess(result.data));
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


export default function* profileSaga() {
  yield all([
    takeLatest(UPDATE_PROFILE_REQUEST, sendProfileData),
    takeLatest(RESET_PASSWORD_REQUEST, resetPassword),
    takeEvery(UPLOAD_IMAGE_REQUEST, uploadImage),
    takeEvery(DELETE_ACCOUNT_REQUEST, accountDelete),
  ]);
}
