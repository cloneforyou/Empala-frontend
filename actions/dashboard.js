export function collapseSidebar(bool) {
  return  {
    type: 'COLLAPSE_SIDEBAR',
    sidebarCollapsed: bool,
  }
}