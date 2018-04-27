const memberItems = [
  {title: 'Upload your picture', key: 'picture', completed: false, active: false},
  {title: 'Basic information', key: 'basic-info', completed: false, active: false},
  {title: 'Contact information', key: 'contact-info', completed: false, active: true},
  {title: 'Home address', key: 'home-address', completed: false, active: false},
  {title: 'Username and password', key: 'name-password', completed: false, active: false},
  {title: 'Confirmation', key: 'confirmation', completed: false, active: false},

];
const identityItems = [
  {title: 'Upload your identification document', key: 'documents', completed: false, active: false},
  {title: 'DOB and SSN', key: 'dob-ssn', completed: false, active: false},
  {title: 'Investment Experience', key: 'investment', completed: false, active: false},
  {title: 'Employment Status', key: 'employment-status', completed: false, active: false},
  {title: 'Work address', key: 'work-address', completed: false, active: false},

];
const accountItems = [
  {title: 'Bank', key: 'bank', completed: false, active: false},
  {title: 'Deposit', key: 'deposit', completed: false, active: false},
];
const approvalsItems = [
  {title: 'Approvals', key: 'approvals', completed: false, active: false},
];

export function getMenuItemsByPageName(pageName) {
  switch (pageName) {
    case 'member':
      return memberItems;
    case 'identity':
      return identityItems;
    case 'account':
      return accountItems;
    case 'approvals':
      return approvalsItems;
  }
}