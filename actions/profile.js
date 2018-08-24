import {
  GET_ACTIVE_TAB_PROFILE,
  CHANGE_ACTIVE_TAB_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  DELETE_USERPIC_SUCCESS,
  DELETE_USERPIC_REQUEST,
  DELETE_USERPIC_FAIL,
  UPDATE_APP_SETTINGS_FAIL,
  UPDATE_APP_SETTINGS_REQUEST, DROP_PROFILE_INFO, CANCEL_PROFILE_INFO_CHANGE,
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

export const deleteUserPic = () => ({
  type: DELETE_USERPIC_REQUEST,
});

export const deleteUserPicSuccess = () => ({
  type: DELETE_USERPIC_SUCCESS,
});
export const deleteUserPicFail = () => ({
  type: DELETE_USERPIC_FAIL,
});

export function updateSettingsFail(err) {
  return {
    type: UPDATE_APP_SETTINGS_FAIL,
    err,
  };
}

export function updateSettingsRequest() {
  return {
    type: UPDATE_APP_SETTINGS_REQUEST,
  };
}

export function dropProfileInfo(data) {
  return {
    type: DROP_PROFILE_INFO,
    data,
  };
}
export function cancelProfileInfoChange() {
  return {
    type: CANCEL_PROFILE_INFO_CHANGE,
  };
}
