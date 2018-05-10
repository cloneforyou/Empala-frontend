// Data fields for page input elements
// obj {
//       id: '',
//       type: '',
//       placeholder: '',
//     }
// for <input> elements
// {
//   label: '',
//     options: [],
// }
// for select elements

export const dataFields = [
  [
    {
      id: 'member_residence',
      label: 'Country of residence',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },
    {
      id: 'member_prefix',
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
      id: 'member_name',
      type: 'text',
      label: 'First name',
      placeholder: 'Iain',
    },
    {
      id: 'member_last_name',
      type: 'text',
      label: 'Last name',
      placeholder: 'Clarke',
    },
    {
      id: 'member_suffix',
      label: 'Suffix',
      options: [
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
    },
  ],
  [
    {
        id: 'member_account_no',
        type: 'text',
        label: 'Account no.',
        placeholder: '0123456789',
      },
    {
      id: 'member-account-type',
      label: 'Account type',
      options: [
        {
          value: 'individual',
          title: 'Individual'
        },
        {
          value: 'joint',
          title: 'Joint'
        },
        {
          value: 'custodial',
          title: 'Custodial'
        },
        {
          value: 'traditional-ira',
          title: 'Traditional IRA'
        },
      ],
    },
    {
      id: 'member_password',
      type: 'password',
      label: 'Password',
    },
    {
      id: 'member_password_confirm',
      type: 'password',
      label: 'Confirm Password',
    },
    {
      id: 'member_email',
      type: 'email',
      label: 'E-mail address',
      placeholder: 'iainclarke@gmail.com',
    },
    {
      id: 'member_contact_phone',
      type: 'text',
      label: 'Contact telephone no',
      placeholder: '+1 415 123 4567',
    },
  ],
  [
    {
      id: 'member_passport',
      type: 'text',
      label: 'Country of issue',
      // placeholder: 'Username',
    },
  ],
];