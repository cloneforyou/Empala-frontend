import { origin } from '../keys';

// trick for enabling quick page navigation in dev
const memberCountryOfResidenceOptions = [
  {
    value: 'United States',
    title: 'United States',
  },
];

if (origin !== 'prod') {
  memberCountryOfResidenceOptions.push({
    value: 'Russia',
    title: 'Russia',
  });
}

export const dataFields = [
  [
    {
      id: 'member_basic_information_residence',
      label: 'Country of residence',
      hint: 'Please select',
      options: memberCountryOfResidenceOptions,
    },
    {
      id: 'member_basic_information_prefix',
      hint: 'Please select',
      label: 'Prefix',
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
    },
    {
      id: 'member_basic_information_last_name',
      type: 'text',
      label: 'Last name',
      placeholder: '',
    },
    {
      id: 'member_basic_information_suffix',
      label: 'Suffix',
      // hint: 'Please select' // no hint needed for this field
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
  ],
  [
    {
      id: 'member_account_account_no',
      type: 'text',
      label: 'Member No.',
      placeholder: '',
      infoButton: true,
    },
    {
      id: 'member_account_customer_type',
      label: 'Customer type',
      hint: 'Please select',
      options: [
        {
          value: 'Individual',
          title: 'Individual',
        },
        // blocked for MVP
        // {
        //   value: 'joint',
        //   title: 'Joint'
        // },
        // {
        //   value: 'custodial',
        //   title: 'Custodial'
        // },
        // {
        //   value: 'traditional-ira',
        //   title: 'Traditional IRA'
        // },
      ],
    },
    {
      id: 'member_account_account_type',
      label: 'Account type',
      hint: 'Please select',
      options: [
        {
          value: 'Cash',
          title: 'Cash',
        },
        {
          value: 'Margin',
          title: 'Regulatory Margin',
        },
      ],
    },
    {
      id: 'member_account_password',
      type: 'password',
      label: 'Password',
      col: 6,
    },
    {
      id: 'member_account_password_confirm',
      type: 'password',
      label: 'Confirm Password',
      col: 6,
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
      label: 'Mobile No. (we will text you to verify the number)',
      placeholder: '',
    },
  ],
  [
    { id: 'member_passport_countryOfIssue' },
    { id: 'member_passport_number' },
    { id: 'member_passport_issue_date', col: 6 },
    { id: 'member_passport_expiry_date', col: 6 },
    { id: 'member_drivers_license_state' },
    { id: 'member_drivers_license_number' },
    { id: 'member_drivers_license_issue_date', col: 6 },
    { id: 'member_drivers_license_expiry_date', col: 6 },
  ],
  [
    {
      id: 'member_trusted_contact_person_trusted_contact_checkbox',
      field: 'checkbox',
      label: 'Trusted Contact Person',
    },
    {
      field: 'input',
      label: 'First name',
      id: 'member_trusted_contact_person_first_name',
      type: 'text',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Last name',
      id: 'member_trusted_contact_person_last_name',
      type: 'text',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Email address',
      id: 'member_trusted_contact_person_email',
      type: 'email',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Contact telephone no.',
      id: 'member_trusted_contact_person_phone',
      type: 'text',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Relationship',
      id: 'member_trusted_contact_person_relationship',
      type: 'text',
      placeholder: '',
    },
  ],
];

export { dataFields as default };
