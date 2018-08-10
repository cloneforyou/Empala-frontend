/* eslint-disable react/react-in-jsx-scope */
import _ from 'lodash';
import UploadUserFile from '../components/registration/UploadUserFile';
import MemberInfoForm from '../components/registrationForms/MemberInfoForm';
import IdentityForm from '../components/registrationForms/IdentityForm';
import ExperienceForm from '../components/registrationForms/ExperienceForm';
import RegulatoryForm from '../components/registrationForms/RegulatoryForm';
import ProfileForm from '../components/registrationForms/ProfileForm';
import { dataFields as memberPageData } from '../localdata/memberPageData';
import { dataFields as regulatoryPageData } from '../localdata/regulatoryPageData';
import { dataFields as identityPageData } from '../localdata/identityPageData';
import { dataFields as experiencePageData } from '../localdata/experiencePageData';
import { dataFields as profilePageData } from '../localdata/profilePageData';


export const menuItems = {
  member: [
    {
      title: 'Basic information', key: 'basic-info', completed: true, active: false,
    },
    {
      title: 'Account information', key: 'account', completed: false, active: false,
    },
    {
      title: 'Identification', key: 'identification', completed: false, active: false,
    },
    {
      title: 'Trusted Contact', key: 'trusted-contact', completed: false, active: false,
    },

  ],
  identity: [
    {
      title: 'Residential Address', key: 'residential-address', completed: false, active: false,
    },
    {
      title: 'Mailing Address', key: 'mailing-address', completed: false, active: false,
    },

  ],
  regulatory: [
    {
      title: 'Regulatory Questions', key: 'regulatory-questions', completed: false, active: false,
    },
    {
      title: 'Identification', key: 'identification', completed: false, active: false,
    },
  ],
  profile: [
    {
      title: 'Employment', key: 'employment', completed: false, active: false,
    },
    {
      title: 'Financials', key: 'financials', completed: false, active: false,
    },
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
};

export function getMenuItemsByTabName(tabName) {
  switch (tabName) {
    case 'member':
      return menuItems.member;
    case 'identity':
      return menuItems.identity;

    case 'regulatory':
      return menuItems.regulatory;
    case 'profile':
      return menuItems.profile;
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
    case 'profile':
      pageFields = _.cloneDeep(profilePageData[tabIndex - 1]);
      break;
    default:
      break;
  }
  return pageFields.map(item => item.id);
}

export function getTabContentByTabName(tabName) {
  return {
    menuItems: menuItems[tabName],
    tabContent: tabContent[tabName],
  };
}

export function getValuesForSelectField(list) {
  return list.map(el => ({
    value: el,
    title: el,
  }));
}

export function generateId() {
  return String(Date.now() + Math.floor(Math.random() * Math.random() * 1000000)).substr(3, 12);
}

export function traceError(err) {
  if (!(err && err.response && err.response.data && err.response.data.info)) {
    return 'registration error!';
  }
  switch (err.response.data.info) {
    case 'MISSING_DATA':
      return 'missing registration data!';
    case 'THIS_EMAIL_IS_ALREADY_IN_USE':
      return 'email address is already in use!';
    case 'THIS_ACCOUNT_IDENTIFIER_IS_ALREADY_IN_USE':
      return 'this account identifier is already in use!';
    case 'THIS_DATA_IS_ALREADY_IN_USE':
      return 'some of your identification values are already in use!';
    case 'EMAIL_IS_NOT_VERIFIED':
      return 'provided e-mail is not verified!';
    case 'PHONE_IS_NOT_VERIFIED':
      return 'provided phone number is not verified!';
    default:
      return err.response.data.info;
  }
}
