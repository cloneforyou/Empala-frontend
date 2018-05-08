import UploadUserFile from "../components/registration/UploadUserFile";
import MemberInfoForm from "../components/registration/member/MemberInfoForm";
import IdentityForm from "../components/registration/identity/IdentityForm";
import AccountForm from "../components/registration/account/AccountForm";
import RegistrationFormDrawer from "../components/registration/RegistrationFormDrawer";

export const menuItems = {
  member: [
    // {title: 'Upload your picture', key: 'picture', completed: false, active: false},
    {title: 'Basic information', key: 'basic-info', completed: true, active: false},
    // {title: 'Contact information', key: 'contact-info', completed: false, active: true},
    // {title: 'Home address', key: 'home-address', completed: false, active: false},
    // {title: 'Username and password', key: 'name-password', completed: false, active: false},
    // {title: 'Confirmation', key: 'confirmation', completed: false, active: false},
    {title: 'Account', key: 'account', completed: false, active: false},
    {title: 'Identification', key: 'identification', completed: false, active: false},

  ],
  identity: [
    // {title: 'Upload your identification document', key: 'documents', completed: false, active: false},
    // {title: 'DOB and SSN', key: 'dob-ssn', completed: false, active: false},
    // {title: 'Investment Experience', key: 'investment', completed: false, active: false},
    // {title: 'Employment Status', key: 'employment-status', completed: false, active: false},
    // {title: 'Work address', key: 'work-address', completed: false, active: false},
    {title: 'Residential Address', key: 'residential-address', completed: false, active: false},
    {title: 'Mailing Address', key: 'mailing-address', completed: false, active: false},
    {title: 'Trusted Contact', key: 'trusted-contact', completed: false, active: false},
    {title: 'Regulatory Questions', key: 'regulatory-questions', completed: false, active: false},

  ],
  // account: [
  //   {title: 'Bank', key: 'bank', completed: false, active: false},
  //   {title: 'Deposit', key: 'deposit', completed: false, active: false},
  // ],
  // approvals: [
  //   {title: 'Approvals', key: 'approvals', completed: false, active: false},
  // ],
  regulatory: [
    {title: 'Identification', key: 'identification', completed: false, active: false},
    {title: 'Family', key: 'family', completed: false, active: false},
  ],
  profile: [
    {title: 'Employment', key: 'employment', completed: false, active: false},
    {title: 'Financials', key: 'financials', completed: false, active: false},
  ],
  experience: [
    {title: 'Investment Experience', key: 'investment-experience', completed: false, active: false},
  ],
};


const tabContent = {
  member: <MemberInfoForm />,
  identity: <IdentityForm />,
  regulatory: [
    'IDENTIFICATION',
    'FAMILY'
  ],
  profile: [
    'EMPLOYMENT',
    'FINANCIALS',
  ],
  experience: [
    'INVESTMENT EXPERIENCE',
  ],
};

export function getMenuItemsByTabName(tabName) {
  switch (tabName) {
    case 'member':
      return menuItems.member;
    case 'identity':
      return menuItems.identity;
    // case 'account':
    //   return menuItems.account;
    // case 'approvals':
    //   return menuItems.approvals;
    case 'regulatory':
          return menuItems.regulatory;
    case 'profile':
          return menuItems.profile;
    case 'experience':
          return menuItems.experience;
    default :
      return menuItems.member;
  }
}


export function getTabContentByTabName(tabName, pageIndex) {
  return {
    menuItems: menuItems[tabName],
    tabContent: tabContent[tabName],
    // tabContent: <RegistrationFormDrawer tabName={tabName} page={pageIndex} />,
  }

}
