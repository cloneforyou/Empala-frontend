import UploadUserFile from "../components/registration/UploadUserFile";
import MemberInfoForm from "../components/registration/member/MemberInfoForm";
import IdentityForm from "../components/registration/identity/IdentityForm";
import ExperienceForm from "../components/registration/experience/ExperienceForm";
import RegulatoryForm from "../components/registrationForms/RegulatoryForm";
import ProfileForm from "../components/registration/profile/ProfileForm";
import AccountForm from "../components/registration/account/AccountForm";
import RegistrationFormDrawer from "../components/registration/RegistrationFormDrawer";
import _ from 'lodash';
import {dataFields as memberPageData} from '../localdata/memberPageData';
import {dataFields as regulatoryPageData} from '../localdata/regulatoryPageData';
import {dataFields as identityPageData} from '../localdata/identityPageData';
import {dataFields as experiencePageData} from '../localdata/experiencePageData';
import {dataFields as profilePageData} from '../localdata/profilePageData';


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
  regulatory: <RegulatoryForm />,
  profile: <ProfileForm />,
  experience: <ExperienceForm />,
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

export function getPageFieldNames(tabName, tabIndex) {
  let pageFields = [];
  switch(tabName) {
    case 'member':
      pageFields = _.cloneDeep(memberPageData[tabIndex - 1]);
      break;
    case 'regulatory':
      pageFields = _.cloneDeep(regulatoryPageData[tabIndex - 1]);
      break;
    case 'identity':
      pageFields = _.cloneDeep(identityPageData[tabIndex - 1]);
      break;
    case 'experience':
      pageFields = _.cloneDeep(experiencePageData[tabIndex - 1]);
      break;
    case 'profile':
      pageFields = _.cloneDeep(profilePageData[tabIndex - 1]);
      break;
    default:
      break;
  }

  // pageFields.forEach((item, i) => {
  //   console.log(' *** item', item);
  //   if (item.options) {
  //     pageFields.splice(i, 1);
  //   }
  // });

  let fieldNames = pageFields.map(item => {
    return item.id
  });

  console.log('>*', fieldNames);
  return fieldNames;
}

export function getTabContentByTabName(tabName, pageIndex) {
  return {
    menuItems: menuItems[tabName],
    tabContent: tabContent[tabName],
    // tabContent: <RegistrationFormDrawer tabName={tabName} page={pageIndex} />,
  }

}
