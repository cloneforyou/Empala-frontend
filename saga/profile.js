import { call, put, select, all, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import request from '../utils/request';
import {
  deleteUserPicFail,
  deleteUserPicSuccess, dropProfileInfo,
  resetPasswordFail,
  resetPasswordSuccess,
  updateProfileFail,
  updateProfileSuccess,
  updateSettingsFail,
} from '../actions/profile';
import {
  deleteAccountFail,
  deleteAccountSuccess,
  uploadImageFail,
  uploadImageSuccess,
  setColorSchemeError,
  setColorScheme, openModal,
  showPopupPIN,
  setAppSettings, restartSessionTimeout,
} from '../actions/dashboard';
import { cleanErrorMessage, passwordUpdateFailed, passwordUpdateSuccess } from '../actions/auth';
import { setFieldInvalid } from '../actions/registration';
import {
  CANCEL_PROFILE_INFO_CHANGE,
  DELETE_USERPIC_REQUEST,
  RESET_PASSWORD_REQUEST,
  UPDATE_APP_SETTINGS_REQUEST,
  UPDATE_PROFILE_REQUEST,
} from '../constants/profile';
import { DELETE_ACCOUNT_REQUEST, UPLOAD_IMAGE_REQUEST, SAVE_COLOR_SCHEME } from '../constants/dashboard';

const urls = {
  updateAppSettings: '/api/settings',
  updateProfileData: '/api/member/update',
  updatePassword: 'api/member/password',
  uploadAvatar: '/api/upload/avatar',
  deleteAccount: '/api/member/delete',
  deleteAvatar: '/api/member/avatar',
};

export function* sendProfileData() {
  const profileData = yield select(state => state.profile.profileUserData);
  const url = urls.updateProfileData;
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
    if (!response.data.data.email_verified) {
      yield put(showPopupPIN('email'));
    }
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    yield put(updateProfileFail(err.message));
    yield put(openModal('updateError'));
  }
}


export function* updateAppSettings() {
  const settings = yield select(state => state.dashboard.currentAppSettings);
  const url = urls.updateAppSettings;
  const options = {
    method: 'PATCH',
    data: settings,
    headers: {
      'X-Access-Token': localStorage.getItem('accessToken'),
    },
  };
  try {
    const response = yield call(request, url, options);
    if (response.data.info === 'SETTINGS_UPDATED') {
      yield put(setAppSettings(response.data.data));
      yield put(restartSessionTimeout());
    }
  } catch (err) {
    yield put(updateSettingsFail('Error while update settings'));
  }
}

export function* resetPassword() {
  const password = yield select(state => state.profile.profileUserData.reset_password);
  const oldPassword = yield select(state => state.profile.profileUserData.reset_password_old);
  const passwordConfirm = yield select(state => state.profile.profileUserData.reset_password_confirm);
  // console.log(' ** RESET', code);
  const url = urls.updatePassword;
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
  const url = urls.uploadAvatar;
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
  const url = urls.deleteAccount;
  const text = yield select(state => state.dashboard['membership_account_delete_legal_wording']);
  const options = {
    headers: { 'x-access-token': accessToken },
    method: 'DELETE',
    data: {
      text,
    },
  };
  try {
    // console.log(' ** DELETE');
    // const result = yield axios.delete(url, { headers: options.headers });
    const result = yield call(request, url, options);
    yield put(deleteAccountSuccess());
    localStorage.removeItem('accessToken');
    window.location.assign('/');
  } catch (err) {
    yield put(deleteAccountFail(err.message));
  }
}

export function* deleteUserpic() {
  const accessToken = localStorage.getItem('accessToken');
  // const url = 'http://localhost:9000/api/account/avatar';
  const url = urls.deleteAvatar;
  // const text = yield select(state => state.dashboard['membership_account_delete_legal_wording']);
  const options = {
    headers: { 'x-access-token': accessToken },
    method: 'DELETE',
  };
  try {
    // console.log(' ** DELETE');
    // const result = yield axios.delete(url, { headers: options.headers });
    const result = yield call(request, url, options);
    yield put(deleteUserPicSuccess());
  } catch (err) {
    yield put(deleteUserPicFail(err.message));
  }
}


export function* saveColorThem({ colorTheme }) {
  const accessToken = localStorage.getItem('accessToken');
  const url = `${urls.updateProfileData}/theme`;
  const options = {
    headers: { 'x-access-token': accessToken },
    method: 'PATCH',
    data: {
      theme: colorTheme,
    },
  };

  try {
    const result = yield call(request, url, options);
    yield put(setColorScheme(colorTheme));
  } catch (err) {
    yield put(setColorSchemeError(err.message));
  }
}

function* cancelInfoChange() {
  const userData = yield select(state => state.dashboard.userData);
  yield put(dropProfileInfo(userData));
}

export default function* profileSaga() {
  yield all([
    takeLatest(UPDATE_PROFILE_REQUEST, sendProfileData),
    takeLatest(RESET_PASSWORD_REQUEST, resetPassword),
    takeLatest(DELETE_USERPIC_REQUEST, deleteUserpic),
    takeLatest(UPDATE_APP_SETTINGS_REQUEST, updateAppSettings),
    takeEvery(UPLOAD_IMAGE_REQUEST, uploadImage),
    takeEvery(SAVE_COLOR_SCHEME, saveColorThem),
    takeEvery(DELETE_ACCOUNT_REQUEST, accountDelete),
    takeEvery(CANCEL_PROFILE_INFO_CHANGE, cancelInfoChange),
  ]);
}
