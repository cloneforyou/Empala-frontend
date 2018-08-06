import {
  GET_ACTIVE_ACCOUNT_TAB,
  CHANGE_ACTIVE_ACCOUNT_TAB,
  CHANGE_SECTION_TITLE_BAR,
} from '../constants/account';

const initialState = {
  activeAccountTab: 0,
  currentSectionTitleBar: 'Global Portfolio',
  iconAccountTitleBar: '',
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
    default:
      return state;
  }
}

export default account;