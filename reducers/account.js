import {
  GET_ACTIVE_ACCOUNT_TAB,
  CHANGE_ACTIVE_ACCOUNT_TAB,
} from '../constants/account';

const initialState = {
  activeAccountTab: 0,
};

function account(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVE_ACCOUNT_TAB:
      return {
        ...state,
        activeAccountTab: action.activeAccountTab,
      };
    case CHANGE_ACTIVE_ACCOUNT_TAB:
      return {
        ...state,
        activeAccountTab: action.tab,
      };
    default:
      return state;
  }
}

export default account;