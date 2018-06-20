import {
  GET_ACTIVE_TAB_PROFILE,
  CHANGE_ACTIVE_TAB_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from '../constants/profile';

export function getActiveTabProfile() {
  return {
    type: GET_ACTIVE_TAB_PROFILE,
  };
}

export function changeActiveTabProfile(activeTab) {
  return {
    type: CHANGE_ACTIVE_TAB_PROFILE,
    activeTab,
  };
}

export function updateProfileSend() {
  return {
    type: UPDATE_PROFILE_REQUEST,
  };
}

export function updateProfileSuccess(data) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    data,
  };
}

export function updateProfileFail(err) {
  return {
    type: UPDATE_PROFILE_FAIL,
    err,
  };
}

export const resetPassword = () => ({
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordFail = err => ({
  type: RESET_PASSWORD_FAIL,
  err,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

