const initialState = {
  sidebarCollapsed: true
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case 'COLLAPSE_SIDEBAR':
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
      }
    default:
      return state;
  }
}

export default dashboard