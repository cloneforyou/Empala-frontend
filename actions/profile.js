import {
  GET_ACTIVE_TAB_PROFILE,
  CHANGE_ACTIVE_TAB_PROFILE,
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