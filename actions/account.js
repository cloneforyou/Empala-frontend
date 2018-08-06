import {
  GET_ACTIVE_ACCOUNT_TAB,
  CHANGE_ACTIVE_ACCOUNT_TAB,
  CHANGE_SECTION_TITLE_BAR,
} from '../constants/account';

export function getActiveAccountTab() {
  console.log('ghbdrgilbjunrlisngrk');
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