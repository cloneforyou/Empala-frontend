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
      id: 'member-residence',
      label: 'Country of residence',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },
    {
      id: 'member-prefix',
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
      id: 'member-name',
      type: 'text',
      label: 'First name',
      placeholder: 'Iain',
    },
    {
      id: 'member-last-name',
      type: 'text',
      label: 'Last name',
      placeholder: 'Clarke',
    },
    {
      id: 'member-suffix',
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
        id: 'member-account-no',
        type: 'text',
        label: 'Account no.',
        placeholder: '0123456789',
      },
    {
      id: 'member-account-type',
      label: 'Account type',
      options: [
        {
          value: 'Individual',
          title: 'Individual'
        },
        {
          value: 'Type2',
          title: 'Type 2'
        },
      ],
    },
    {
      id: 'member-password',
      type: 'password',
      label: 'Password',
    },
    {
      id: 'member-password-confirm',
      type: 'password',
      label: 'Confirm Password',
    },
    {
      id: 'member-email',
      type: 'email',
      label: 'E-mail address',
      placeholder: 'iainclarke@gmail.com',
    },
    {
      id: 'member-contact-phone',
      type: 'text',
      label: 'Contact telephone no',
      placeholder: '+1 415 123 4567',
    },
  // ],
  // [
  //   {
  //     id: 'member-home-address-line1',
  //     type: 'text',
  //     label: 'address-line1',
  //     placeholder: '898 Candido Hollow',
  //   },
  //   {
  //     id: 'member-home-address-line2',
  //     type: 'text',
  //     label: 'address-line2',
  //     placeholder: 'Jacobson Cape',
  //   },
  //   {
  //     id: 'member-city',
  //     type: 'text',
  //     placeholder: 'City',
  //   },
  //   {
  //     id: 'member-zip-code',
  //     type: 'number',
  //     placeholder: 'Zip code',
  //   },
  //   {
  //     id: 'member-country',
  //     type: 'text',
  //     placeholder: 'Country',
  //   },
  ],
  [
    {
      id: 'member-passport',
      type: 'text',
      label: 'Country of issue',
      // placeholder: 'Username',
    },
  ],
];