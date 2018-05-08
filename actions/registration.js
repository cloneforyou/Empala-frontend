import { CHANGE_TAB_PAGE_INDEX,
  GET_MENU_ITEMS,
  SET_TAB_NAME,
  SET_TAB_PAGE_INDEX,
  SET_FIELD_VALUE } from "../constants/registration";

export function getMenuItems(items) {
  return  {
    type: GET_MENU_ITEMS,
    items,
  }
}

export function setTabName(tabName) {
  return  {
    type: SET_TAB_NAME,
    tabName,
  }
}

export function setTabPageIndex(pageIndex) {
  return  {
    type: SET_TAB_PAGE_INDEX,
    pageIndex,
  }
}

export function changeTabPage(tabName, tabIndex, direction) {
  return  {
    type: CHANGE_TAB_PAGE_INDEX,
    tabName,
    tabIndex,
    direction,
  }
}


export function setInputFieldValueById(id, value) {
  return  {
    type: SET_FIELD_VALUE,
    id,
    value,
  }
}