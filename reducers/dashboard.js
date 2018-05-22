const initialState = {
  sidebarCollapsed: true,
  selectedGroup: {},
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case 'COLLAPSE_SIDEBAR':
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
      };
    case 'CHOOSE_GROUP_COUNTRY':
      return {
        ...state,
        selectedGroup: action.selectedGroup,
      };
    default:
      return state;
  }
}

export default dashboard;
