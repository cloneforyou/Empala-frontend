import {
  COLLAPSE_SIDEBAR,
  GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS,
} from "../constants/dashboard";

const initialState = {
  loading: false,
  error: false,
  sidebarCollapsed: true,
  userData: false,
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case COLLAPSE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
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
      }
    }
    default:
      return state;
  }
}

export default dashboard
