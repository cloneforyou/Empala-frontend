import UploadUserFile from '../components/registration/UploadUserFile';
import MemberInfoForm from '../components/registrationForms/MemberInfoForm';
import IdentityForm from '../components/registrationForms/IdentityForm';
import ExperienceForm from '../components/registrationForms/ExperienceForm';
import RegulatoryForm from '../components/registrationForms/RegulatoryForm';
import ProfileForm from '../components/registrationForms/ProfileForm';
import _ from 'lodash';
import { dataFields as memberPageData } from '../localdata/memberPageData';
import { dataFields as regulatoryPageData } from '../localdata/regulatoryPageData';
import { dataFields as identityPageData } from '../localdata/identityPageData';
import { dataFields as experiencePageData } from '../localdata/experiencePageData';
import { dataFields as profilePageData } from '../localdata/profilePageData';


export const menuItems = {
  member: [
    // {title: 'Upload your picture', key: 'picture', completed: false, active: false},
    {
      title: 'Basic information', key: 'basic-info', completed: true, active: false,
    },
    // {title: 'Contact information', key: 'contact-info', completed: false, active: true},
    // {title: 'Home address', key: 'home-address', completed: false, active: false},
    // {title: 'Username and password', key: 'name-password', completed: false, active: false},
    // {title: 'Confirmation', key: 'confirmation', completed: false, active: false},
    {
      title: 'Account', key: 'account', completed: false, active: false,
    },
    {
      title: 'Identification', key: 'identification', completed: false, active: false,
    },

  ],
  identity: [
    // {title: 'Upload your identification document', key: 'documents', completed: false, active: false},
    // {title: 'DOB and SSN', key: 'dob-ssn', completed: false, active: false},
    // {title: 'Investment Experience', key: 'investment', completed: false, active: false},
    // {title: 'Employment Status', key: 'employment-status', completed: false, active: false},
    // {title: 'Work address', key: 'work-address', completed: false, active: false},
    {
      title: 'Residential Address', key: 'residential-address', completed: false, active: false,
    },
    {
      title: 'Mailing Address', key: 'mailing-address', completed: false, active: false,
    },
    {
      title: 'Trusted Contact', key: 'trusted-contact', completed: false, active: false,
    },
    {
      title: 'Regulatory Questions', key: 'regulatory-questions', completed: false, active: false,
    },

  ],
  // account: [
  //   {title: 'Bank', key: 'bank', completed: false, active: false},
  //   {title: 'Deposit', key: 'deposit', completed: false, active: false},
  // ],
  // approvals: [
  //   {title: 'Approvals', key: 'approvals', completed: false, active: false},
  // ],
  regulatory: [
    {
      title: 'Identification', key: 'identification', completed: false, active: false,
    },
    {
      title: 'Family', key: 'family', completed: false, active: false,
    },
  ],
  profile: [
    {
      title: 'Employment', key: 'employment', completed: false, active: false,
    },
    {
      title: 'Financials', key: 'financials', completed: false, active: false,
    },
  ],
  experience: [
    {
      title: 'Investment Experience', key: 'investment-experience', completed: false, active: false,
    },
  ],
};

export const usStatesList = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated Stated of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

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
    default:
      return menuItems.member;
  }
}

export function getPageFieldNames(tabName, tabIndex) {
  let pageFields = [];
  switch (tabName) {
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
  return pageFields.map(item => item.id);
}

export function getTabContentByTabName(tabName, pageIndex) {
  return {
    menuItems: menuItems[tabName],
    tabContent: tabContent[tabName],
    // tabContent: <RegistrationFormDrawer tabName={tabName} page={pageIndex} />,
  };
}


export function getValuesForSelectField(list) {
  return list.map(el => ({
    value: el,
    title: el,
  }));
}

