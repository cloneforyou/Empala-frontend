import {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/profile';

export function updateProfileSend() {
  return {
    type: UPDATE_PROFILE_REQUEST,
  };
}
export function updateProfileSuccess(data) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    data
  };
}
export function updateProfileFail(err) {
  return {
    type: UPDATE_PROFILE_FAIL,
    err,
  };
}

