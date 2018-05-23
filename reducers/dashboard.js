import {
  COLLAPSE_SIDEBAR,
  GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, SET_ACTIVE_PAGE,
} from '../constants/dashboard';

const initialState = {
  sidebarCollapsed: true,
  selectedGroup: {},
  loading: false,
  error: false,
  userData: false,
  activePageDashboard: 'Overflow',
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case COLLAPSE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
      };
    case 'CHOOSE_GROUP_COUNTRY':
      return {
        ...state,
        selectedGroup: action.selectedGroup,
      };
    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        userData: action.data,
      };
    }
    case SET_ACTIVE_PAGE: {
      return {
        ...state,
        activePageDashboard: action.page,
      };
    }
    default:
      return state;
  }
}

export default dashboard;
