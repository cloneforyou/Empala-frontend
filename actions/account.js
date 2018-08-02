import {
  GET_ACTIVE_ACCOUNT_TAB,
  CHANGE_ACTIVE_ACCOUNT_TAB,
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

