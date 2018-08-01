import {
  GET_ACTIVE_TAB_PROFILE,
  CHANGE_ACTIVE_TAB_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS, DELETE_USERPIC_SUCCESS, DELETE_USERPIC_REQUEST, DELETE_USERPIC_FAIL,
} from '../constants/profile';
import { SET_FIELD_VALUE } from '../constants/funding';

export function setInputFieldValueById(id, value) {
  return {
    type: SET_FIELD_VALUE,
    id,
    value,
  };
}

/* =====================*/

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

