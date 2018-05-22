import { listContries } from '../localdata/marketAccesLists';

export function collapseSidebar(bool) {
  return {
    type: 'COLLAPSE_SIDEBAR',
    sidebarCollapsed: bool,
  };
}

export const setGroupCountry = (label) => {
  let group = {};
  listContries.forEach((item) => {
    if (item.label === label) {
      group = item;
    }
  });
  return {
    type: 'CHOOSE_GROUP_COUNTRY',
    selectedGroup: group,
  };
};

