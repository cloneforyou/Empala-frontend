import {
  CHOOSE_GROUP_COUNTRY,
  CLEAN_ERROR_TEXT,
  CLEAN_IMAGE_DATA,
  CLOSE_MODAL,
  COLLAPSE_SIDEBAR,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  OPEN_MODAL,
  SET_ACTIVE_PAGE,
  SET_UPLOADABLE_IMAGE,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  SET_FIELD_VALUE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
  SET_COLOR_SCHEME,
  SET_ORDERS_LIST,
  SET_WATCH_LISTS,
  SET_WATCHLIST_NUMBER,
  SET_POSITIONS,
  MODIFY_POSITION_DATA,
  UPDATE_ORDERS_LIST,
  SET_PARSED_POSITIONS,
  UPDATE_QUOTES,
} from '../constants/dashboard';
import { RESET_PASSWORD_FAIL } from '../constants/profile';
import { parsePositionsList, parseWatchList, parseOrdersList } from '../utils/dashboardUtils';

const initialState = {
  sidebarCollapsed: true,
  selectedGroup: {},
  loading: true,
  error: false,
  userData: false,
  userDataLoaded: false,
  activePageDashboard: 'overflow',
  loadingPage: true,
  modalOpen: false,
  openModalName: false,
  uploadableImage: false,
  membership_account_delete_confirm: '',
  currentColorScheme: 'light',
  ordersList: false,
  watchLists: false,
  positions: false,
  parsedPositions: false,
  parsedOrdersList: false,
  parsedWatchLists: false,
  watchListNumber: false,
  sessionId: false,
  quotes: false,
};


const modifiyPositionsList = (list, data) => {
  list.map((pos) => {
    if (pos.sec_id === +data.Key) {
      pos.m2m = data.Last;
      pos.day_chg = data.ChangePc;
    }
  });
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUOTES:
      return {
        ...state,
        quotes: { ...state.quotes, [action.quote.Key]: action.quote },
      };
    case COLLAPSE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
      };
    case CHOOSE_GROUP_COUNTRY:
      return {
        ...state,
        selectedGroup: action.selectedGroup,
      };
    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SET_FIELD_VALUE:
      if (action.id === 'membership_account_delete_confirm' ||
        action.id === 'membership_account_delete_legal_wording') {
        return {
          ...state,
          [action.id]: action.value,
        };
      }
      return state;
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.data,
        userDataLoaded: true,
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePageDashboard: action.page,
        loadingPage: false,
      };
    case SET_UPLOADABLE_IMAGE:
      return {
        ...state,
        uploadableImage: action.img,
      };
    case CLEAN_IMAGE_DATA:
      return {
        ...state,
        uploadableImage: false,
      };
    case UPLOAD_IMAGE_REQUEST:
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        modalOpen: false,
        error: '',
      };
    case UPLOAD_IMAGE_FAIL:
    case DELETE_ACCOUNT_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.err,
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
        openModalName: action.name,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
        openModalName: false,
      };
    case CLEAN_ERROR_TEXT:
      return {
        ...state,
        error: false,
      };
    case SET_COLOR_SCHEME:
      return {
        ...state,
        currentColorScheme: action.colorScheme,
      };
    case SET_ORDERS_LIST:
      return {
        ...state,
        ordersList: action.data,
        parsedOrdersList: parseOrdersList(action.data),
      };
    case SET_WATCH_LISTS:
      return {
        ...state,
        watchLists: action.data,
        parsedWatchLists: action.data.map(list => parseWatchList(list)),
      };
    case SET_POSITIONS:
      return {
        ...state,
        positions: action.data,
        parsedPositions: parsePositionsList(action.data),
      };
    case SET_PARSED_POSITIONS:
      return {
        ...state,
        parsedPositions: action.data,
      };
    case SET_WATCHLIST_NUMBER:
      return {
        ...state,
        watchListNumber: action.number,
      };
    case 'SET_SESSION_ID':
      if (action.name === 'orders') {
        return ({
          ...state,
          sessionId: action.id,
        });
      }
      if (action.name === 'quote') {
        return ({
          ...state,
          sessionQuotesId: action.id,
        });
      }
      break;
    case UPDATE_ORDERS_LIST:
      return {
        ...state,
        parsedOrdersList: { ...state.parsedOrdersList, id: parseOrdersList([action.data])[0] },
      };
    case MODIFY_POSITION_DATA:
      return {
        ...state,
        parsedPositions: state.parsedPositions.map(pos => {
          if (pos.sec_id === +action.data.Key) {
            return {
              ...pos,
              m2m: action.data.Last,
              day_chg: action.data.ChangePc,
            };
          }
          return pos;
        }),
      };
    default:
      return state;
  }
}

export default dashboard;
