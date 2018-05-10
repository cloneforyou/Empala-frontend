import {
  GET_MENU_ITEMS,
  SET_FIELD_VALUE,
  SET_MEMBER_DOCUMENT_TYPE,
  SET_TAB_NAME,
  SET_TAB_PAGE_INDEX,
  VALIDATE_FIELD_ERROR,
  VALIDATE_FIELD_SUCCESS,
} from "../constants/registration";
import {getMenuItemsByTabName} from "../utils/registrationUtils";

const initialState = {
  tabName: false,
  tabIndex: false,
  menuItems: [],
  registrationData: {
    memberDocument: 'passport'
  },
  fieldsErrors: {}
};

function registration(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_ITEMS:
      return {...state, menuItems: action.items};
    case SET_TAB_NAME:
      return {...state, tabName: action.tabName};
    case SET_TAB_PAGE_INDEX:
      return {...state, tabIndex: action.pageIndex};
    case SET_MEMBER_DOCUMENT_TYPE:
      return {...state, registrationData: {...state.registrationData, memberDocument: action.document}};
    case SET_FIELD_VALUE:
      return {...state, registrationData: {...state.registrationData, [action.id]: action.value}};
      case VALIDATE_FIELD_ERROR:
        console.log(' passwords mismatch' );
      return {...state, fieldsErrors: {...state.fieldsErrors, [action.fieldId]: action.message}};
      case VALIDATE_FIELD_SUCCESS:
        console.log(' passwords equal' );
      return {...state, fieldsErrors: {...state.fieldsErrors, [action.fieldId]: ''}};
    default:
      return state;
  }
}

export default registration;