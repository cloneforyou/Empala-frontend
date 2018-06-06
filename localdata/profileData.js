import { countriesList } from './countriesList';

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