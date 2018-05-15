const initialState = {
  sidebarCollapsed: true
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case 'COLLAPSE_SIDEBAR':
      console.log('action--', action);
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
      }
    default:
      return state;
  }
}

export default dashboard