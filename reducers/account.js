import {
  GET_ACTIVE_ACCOUNT_TAB,
  CHANGE_ACTIVE_ACCOUNT_TAB,
  CHANGE_SECTION_TITLE_BAR,
  SET_INPUT_VALUE_FOR_ACCOUNT,
  CLEAR_INPUT_VALUE_FOR_ACCOUNT,
} from '../constants/account';

const initialState = {
  activeAccountTab: 0,
  currentSectionTitleBar: 'Global Portfolio',
  iconAccountTitleBar: '',
  changedAccountField: {},
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
    case CHANGE_SECTION_TITLE_BAR:
      return {
        ...state,
        currentSectionTitleBar: action.tab,
        iconAccountTitleBar: action.icon,
      };
    case SET_INPUT_VALUE_FOR_ACCOUNT:
      return {
        ...state,
        changedAccountField: { accountId: action.account, name: action.name },
      };
    case CLEAR_INPUT_VALUE_FOR_ACCOUNT:
      return {
        ...state,
        changedAccountField: {},
      };
    default:
      return state;
  }
}

export default account;