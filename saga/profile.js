import { call, put, select } from 'redux-saga/effects';
import request from '../utils/request';
import { updateProfileFail, updateProfileSuccess } from '../actions/profile';

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