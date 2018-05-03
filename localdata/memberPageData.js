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
      id: 'member-name',
      type: 'text',
      label: 'Name',
      placeholder: 'Estella',
    },
    {
      id: 'member-last-name',
      type: 'text',
      label: 'Last name',
      placeholder: 'Robbins',
    },
  ],
  [
    {
      id: 'member-email',
      type: 'email',
      label: 'E-mail',
      placeholder: 'Estella',
    },
    {
      id: 'member-mobile',
      type: 'text',
      label: 'Mobile phone',
      placeholder: '+44 999999999',
    },
  ],
  [
    {
      id: 'member-home-address-line1',
      type: 'text',
      label: 'address-line1',
      placeholder: '898 Candido Hollow',
    },
    {
      id: 'member-home-address-line2',
      type: 'text',
      label: 'address-line2',
      placeholder: 'Jacobson Cape',
    },
    {
      id: 'member-city',
      type: 'text',
      placeholder: 'City',
    },
    {
      id: 'member-zip-code',
      type: 'number',
      placeholder: 'Zip code',
    },
    {
      id: 'member-country',
      type: 'text',
      placeholder: 'Country',
    },
  ],
  [
    {
      id: 'member-username',
      type: 'text',
      label: 'Username',
      placeholder: 'Username',
    },
    {
      id: 'member-password',
      type: 'password',
      label: 'Password',
    },
  ],
];