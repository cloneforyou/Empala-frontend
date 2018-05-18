export const dataFields = [
  // basic information
  [
    {
      id: 'member_basic_information_residence',
      label: 'Country of residence',
      hint: 'Please select',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },

    {
      id: 'member_basic_information_prefix',
      hint: 'Please select',
      label: 'Prefix',
      options: [
        {
          value: 'Mr',
          title: 'Mr'
        },
        {
          value: 'Mrs',
          title: 'Mrs'
        },
        {
          value: 'Ms',
          title: 'Ms'
        },
        {
          value: 'Dr',
          title: 'Dr'
        },
      ],
    },

    {
      id: 'member_basic_information_first_name',
      type: 'text',
      label: 'First name',
      placeholder: 'Iain',
    },

    {
      id: 'member_basic_information_last_name',
      type: 'text',
      label: 'Last name',
      placeholder: 'Clarke',
    },

    {
      id: 'member_basic_information_suffix',
      label: 'Suffix',
      hint: 'Please select',
      options: [
        {
          value: ' ',
          title: 'No suffix'
        },
        {
          value: 'Jr',
          title: 'Jr'
        },
        {
          value: 'Sr',
          title: 'Sr'
        },
        {
          value: 'II',
          title: 'II'
        },
        {
          value: 'III',
          title: 'III'
        },
      ],
    }
  ],

  // account
  [
    {
      id: 'member_account_account_no',
      type: 'text',
      label: 'Membership no.',
      numberField: true,
      placeholder: '0123456789',
    },

    {
      id: 'member_account_account_type',
      label: 'Account type',
      hint: 'Please select',
      options: [
        {
          value: 'individual',
          title: 'Individual'
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
      placeholder: 'iainclarke@gmail.com',
    },

    {
      id: 'member_account_contact_phone',
      type: 'text',
      label: 'Contact telephone no.',
      placeholder: '+1 415 123 4567',
    },
  ],

  // identification
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
];
