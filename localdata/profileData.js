import { countriesList } from './countriesList';
import { usStatesList } from './usStatesList';
import { getValuesForSelectField } from '../utils/registrationUtils';

const usStates = getValuesForSelectField(usStatesList);

export const fieldsMembership = [
  {
    id: 'member_basic_information_prefix',
    hint: 'Please select',
    label: 'Prefix',
    col: 2,
    options: [
      {
        value: 'Mr',
        title: 'Mr',
      },
      {
        value: 'Mrs',
        title: 'Mrs',
      },
      {
        value: 'Ms',
        title: 'Ms',
      },
      {
        value: 'Dr',
        title: 'Dr',
      },
    ],
  },
  {
    id: 'member_basic_information_first_name',
    type: 'text',
    label: 'First name',
    placeholder: '',
    col: 4,
  },
  {
    id: 'member_basic_information_last_name',
    type: 'text',
    label: 'Last name',
    placeholder: '',
    col: 4,
  },
  {
    id: 'member_basic_information_suffix',
    label: 'Suffix',
    hint: 'Please select',
    col: 2,
    options: [
      {
        value: ' ',
        title: ' ',
      },
      {
        value: 'Jr',
        title: 'Jr',
      },
      {
        value: 'Sr',
        title: 'Sr',
      },
      {
        value: 'II',
        title: 'II',
      },
      {
        value: 'III',
        title: 'III',
      },
    ],
  },
  {
    id: 'member_account_email',
    type: 'email',
    label: 'E-mail address',
    placeholder: '',
  },
  {
    id: 'member_account_contact_phone',
    type: 'text',
    label: 'Contact telephone no.',
    placeholder: '',
  },
  {
    id: 'regulatory_identification_dateOfBirth',
    field: 'date',
    label: 'Date of birth',
    birthDay: true,
    col: 6,
  },
  {
    id: 'regulatory_family_martial_status',
    hint: 'Please select',
    label: 'Marital status',
    field: 'select',
    col: 6,
    options: [
      {
        value: 'Single',
        title: 'Single',
      },
      {
        value: 'Married',
        title: 'Married',
      },
      {
        value: 'Domestic Partner',
        title: 'Domestic Partner',
      },
      {
        value: 'Divorced',
        title: 'Divorced',
      },
      {
        value: 'Widowed',
        title: 'Widowed',
      },
    ],
  },
  {
    id: 'regulatory_identification_ssn',
    label: 'Government tax ID (SSN / SIN)',
    type: 'text',
    field: 'input',
    placeholder: '',
    col: 6,
  },
  {
    label: 'No of dependents',
    id: 'regulatory_family_dependents',
    field: 'input',
    type: 'text',
    typeField: 'numberField',
    col: 6,
  },
  {
    id: 'regulatory_identification_citizenship',
    label: 'Country of citizenship',
    hint: 'Please select',
    field: 'select',
    options: countriesList,
    autoWidth: true,
  },
];

export const fieldsResidentialAddress = [
  {
    id: 'identity_residential_address_residential_address_line_1',
    field: 'input',
    label: 'Residential address line 1',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'identity_residential_address_residential_address_line_2',
    field: 'input',
    label: 'Residential address line 2',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'identity_residential_address_residential_address_city',
    hint: 'Please select',
    field: 'input',
    label: 'City',
    type: 'text',
  },
  {
    field: 'input',
    label: 'Zip code',
    id: 'identity_zip_code',
    type: 'text',
    typeField: 'numberField',
    placeholder: '',
    col: 6,
  },
  {
    id: 'identity_residential_address_residential_address_state',
    hint: 'Please select',
    field: 'select',
    label: 'State',
    options: usStates,
    autoWidth: true,
    col: 6,
  },
  {
    id: 'identity_residential_address_residential_address_country',
    hint: 'Please select',
    field: 'select',
    label: 'Country',
    options: [
      {
        value: 'United States',
        title: 'United States',
      },
    ],
  },
];

export const fieldsMaillingAddress = [
  {
    id: 'identity_residential_address_residential_address_line_1',
    field: 'input',
    label: 'Address line 1',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'identity_residential_address_residential_address_line_2',
    field: 'input',
    label: 'Address line 2',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'identity_residential_address_residential_address_city',
    hint: 'Please select',
    field: 'input',
    label: 'City',
    type: 'text',
  },
  {
    field: 'input',
    label: 'Zip code',
    id: 'identity_zip_code',
    type: 'text',
    typeField: 'numberField',
    placeholder: '',
    col: 6,
  },
  {
    id: 'identity_residential_address_residential_address_state',
    hint: 'Please select',
    field: 'select',
    label: 'State',
    options: usStates,
    autoWidth: true,
    col: 6,
  },
  {
    id: 'identity_residential_address_residential_address_country',
    hint: 'Please select',
    field: 'select',
    label: 'Country',
    options: [
      {
        value: 'United States',
        title: 'United States',
      },
    ],
  },
];

export const fieldsPersonalWealth = [
  {
    id: 'profile_financials_annual_income',
    hint: 'Please select',
    label: 'Annual income',
    options: [
      {
        value: '0 - 50,000',
        title: '0 – 50,000',
      },
      {
        value: '50,001 – 100,000',
        title: '50,001 – 100,000',
      },
      {
        value: '100,001 – 200,000',
        title: '100,001 – 200,000',
      },
      {
        value: '200,001 – 500,000',
        title: '200,001 – 500,000',
      },
      {
        value: '500,001 – 5,000,000',
        title: '500,001 – 5,000,000',
      },
      {
        value: 'Greater than 5,000,000',
        title: 'Greater than 5,000,000',
      },
    ],
  },

  {
    label: 'Total net worth',
    id: 'profile_financials_total_net_worth',
    hint: 'Please select',
    options: [
      {
        value: '0 – 100,000',
        title: '0 – 100,000',
      },
      {
        value: '100,001 – 200,000',
        title: '100,001 – 200,000',
      },
      {
        value: '200,001 – 400,000',
        title: '200,001 – 400,000',
      },
      {
        value: '400,001 – 1,000,000',
        title: '400,001 – 1,000,000',
      },
      {
        value: '1,000,001 – 10,000,000',
        title: '1,000,001 – 10,000,000',
      },
      {
        value: 'Greater than 10,000,000',
        title: 'Greater than 10,000,000',
      },
    ],
  },

  {
    label: 'Liquid net worth',
    id: 'profile_financials_liquid_net_worth',
    hint: 'Please select',
    options: [
      {
        value: '0 – 100,000',
        title: '0 – 100,000',
      },
      {
        value: '100,001 – 200,000',
        title: '100,001 – 200,000',
      },
      {
        value: '200,001 – 400,000',
        title: '200,001 – 400,000',
      },
      {
        value: '400,001 – 1,000,000',
        title: '400,001 – 1,000,000',
      },
      {
        value: '1,000,001 – 10,000,000',
        title: '1,000,001 – 10,000,000',
      },
      {
        value: 'Greater than 10,000,000',
        title: 'Greater than 10,000,000',
      },
    ],
  },

  {
    id: 'profile_financials_tax_rate_profile',
    label: 'Tax rate profile',
    hint: 'Please select',
    options: [
      {
        value: 'Low',
        title: 'Low',
      },
      {
        value: 'Medium',
        title: 'Medium',
      },
      {
        value: 'High',
        title: 'High',
      },
    ],
  },
];

export const fieldsMemberPersonal = [
  {
    id: 'member_account_account_no',
    type: 'text',
    label: 'Account No.',
    placeholder: '',
  },
  {
    id: 'member_account_account_type',
    label: 'Account type',
    hint: 'Please select',
    options: [
      {
        value: 'individual',
        title: 'Individual',
      },
    ],
  },
  {
    id: 'member_account_since',
    type: 'text',
    label: 'Member since',
    placeholder: '',
  },
];

export const fieldResetPassword = [
  {
    id: 'member_account_password_confirm',
    type: 'password',
    label: 'Resset Password',
  },
];

export const fieldsEmployment = [
  {
    id: 'profile_employment_employment_type',
    label: 'Employment type',
    hint: 'Please select',
    options: [
      {
        value: 'Employed',
        title: 'Employed',
      },
      {
        value: 'Self-employed',
        title: 'Self-employed',
      },
      {
        value: 'Not employed',
        title: 'Not employed',
      },
      {
        value: 'Retired',
        title: 'Retired',
      },
    ],
  },
  {
    id: 'profile_employment_employer_name',
    label: 'Employer name',
    type: 'text',
    placeholder: '',
  },

  {
    id: 'profile_employment_city',
    field: 'input',
    label: 'City',
    type: 'text',
  },
  {
    label: 'Zip code',
    id: 'profile_employment_zip_code',
    type: 'text',
    typeField: 'numberField',
    col: '6',
    placeholder: '',
  },

  {
    id: 'profile_employment_state',
    hint: 'Please select',
    label: 'State',
    col: '6',
    options: usStates,
    autoWidth: true,
  },
  {
    id: 'profile_employment_employment_country',
    label: 'Employment сountry',
    type: 'text',
    placeholder: '',
  },
];

export const fieldsTrustedContactPerson = [
  {
    id: 'identity_trusted_contact_person_first_name',
    label: 'First name',
    type: 'text',
    placeholder: '',
    col: 6,
  },
  {
    id: 'identity_trusted_contact_person_last_name',
    label: 'Last name',
    type: 'text',
    placeholder: '',
    col: 6,
  },
  {
    id: 'identity_trusted_contact_person_email',
    label: 'Email address',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'identity_trusted_contact_person_relationship',
    label: 'Relationship',
    type: 'text',
    placeholder: '',
  },
];
