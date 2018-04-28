import UploadUserFile from "../components/registration/UploadUserFile";
import MemberInfoForm from "../components/registration/member/MemberInfoForm";
import IdentityForm from "../components/registration/identity/IdentityForm";
import AccountForm from "../components/registration/account/AccountForm";

const menuItems = {
  member: [
    {title: 'Upload your picture', key: 'picture', completed: false, active: false},
    {title: 'Basic information', key: 'basic-info', completed: true, active: false},
    {title: 'Contact information', key: 'contact-info', completed: false, active: true},
    {title: 'Home address', key: 'home-address', completed: false, active: false},
    {title: 'Username and password', key: 'name-password', completed: false, active: false},
    {title: 'Confirmation', key: 'confirmation', completed: false, active: false},

  ],
  identity: [
    {title: 'Upload your identification document', key: 'documents', completed: false, active: false},
    {title: 'DOB and SSN', key: 'dob-ssn', completed: false, active: false},
    {title: 'Investment Experience', key: 'investment', completed: false, active: false},
    {title: 'Employment Status', key: 'employment-status', completed: false, active: false},
    {title: 'Work address', key: 'work-address', completed: false, active: false},

  ],
  account: [
    {title: 'Bank', key: 'bank', completed: false, active: false},
    {title: 'Deposit', key: 'deposit', completed: false, active: false},
  ],
  approvals: [
    {title: 'Approvals', key: 'approvals', completed: false, active: false},
  ],
};


const tabContent = {
  member: [
    <UploadUserFile />,
    <MemberInfoForm page={0} />,
    <MemberInfoForm page={1} />,
    <MemberInfoForm page={2} />,
  ],
  identity: [
    <UploadUserFile />,
    <IdentityForm page={0} />,
    <IdentityForm page={1} />,
    <IdentityForm page={2} />,
    <IdentityForm page={3} />,
  ],
  account: [
    <AccountForm page={0} />,
    'DEPOSIT'
  ],
  approvals: [
    'APPROVALS',
  ],
};

export function getMenuItemsByTabName(tabName) {
  switch (tabName) {
    case 'member':
      return menuItems.member;
    case 'identity':
      return menuItems.identity;
    case 'account':
      return menuItems.account;
    case 'approvals':
      return menuItems.approvals;
  }
}


export function getTabContentByTabName(tabName, itemNumber) {
  switch (tabName) {
    case 'member':
      return {
        menuItems: menuItems.member,
        tabContent: tabContent.member[itemNumber],
      };
    case 'identity':
      return {
        menuItems: menuItems.identity,
        tabContent: tabContent.identity[itemNumber],
      };
    case 'account':
      return {
        menuItems: menuItems.account,
        tabContent: tabContent.account[itemNumber],
      };
    case 'approvals':
      return {
        menuItems: menuItems.approvals,
        tabContent: tabContent.approvals[itemNumber],
      };

  }

}
