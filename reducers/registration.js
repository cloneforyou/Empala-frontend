import {
  GET_MENU_ITEMS, SET_TAB_NAME, SET_TAB_PAGE_INDEX,
} from "../constants/registration";
import {getMenuItemsByTabName} from "../utils/registrationUtils";


const initialState = {
  tabName: false,
  tabIndex: false,
  menuItems: [],
};

function registration(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_ITEMS:
      return {...state, menuItems: action.items};
    case SET_TAB_NAME:
      return {...state, tabName: action.tabName};
    case SET_TAB_PAGE_INDEX:
      return {...state, tabIndex: action.pageIndex};
    default:
      return state;
  }
}

export default registration;