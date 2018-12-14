import {
  GET_ACTIVE_ACCOUNT_TAB,
  CHANGE_ACTIVE_ACCOUNT_TAB,
  CHANGE_SECTION_TITLE_BAR,
  SET_INPUT_VALUE_FOR_ACCOUNT,
  SAVE_INPUT_VALUE_FOR_ACCOUNT,
  CLEAR_INPUT_VALUE_FOR_ACCOUNT,
} from '../constants/account';

export function getActiveAccountTab() {
  return {
    type: GET_ACTIVE_ACCOUNT_TAB,
  };
}

export const changeActiveAccountTab = tab => ({
  type: CHANGE_ACTIVE_ACCOUNT_TAB,
  tab,
});

export const changeSectionTitleBar = (tab, icon) => ({
  type: CHANGE_SECTION_TITLE_BAR,
  tab,
  icon,
});

export const setInputValueForAccount = (account, name) => ({
  type: SET_INPUT_VALUE_FOR_ACCOUNT,
  account,
  name,
});

export const clearInputValueForAccount = () => ({
  type: CLEAR_INPUT_VALUE_FOR_ACCOUNT,
});

export const saveInputValueForAccount = id => ({
  type: SAVE_INPUT_VALUE_FOR_ACCOUNT,
  id,
});