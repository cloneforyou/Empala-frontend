import {
  GET_ACTIVE_TAB_PROFILE,
  CHANGE_ACTIVE_TAB_PROFILE,
} from '../constants/profile';

const initialState = {
  profileUserData: {},
  tabValue: 0,
};

function profile(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVE_TAB_PROFILE:
      return { ...state, tabValue: action.tabValue };
    case CHANGE_ACTIVE_TAB_PROFILE:
      return { ...state, tabValue: action.activeTab };
    default:
      return state;
  }
}

export default profile;
