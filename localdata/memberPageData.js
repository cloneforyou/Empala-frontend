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
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Estella',
    },
    {
      id: 'last-name',
      type: 'text',
      label: 'Last name',
      placeholder: 'Robbins',
    },
  ],
  [
    {
      id: 'email',
      type: 'email',
      label: 'E-mail',
      placeholder: 'Estella',
    },
    {
      id: 'mobile',
      type: 'text',
      label: 'Mobile phone',
      placeholder: '+44 999999999',
    },
  ],
  [
    {
      id: 'Home address-line1',
      type: 'text',
      label: 'address-line1',
      placeholder: '898 Candido Hollow',
    },
    {
      id: 'Home address-line2',
      type: 'text',
      label: 'address-line2',
      placeholder: 'Jacobson Cape',
    },
    {
      id: 'city',
      type: 'text',
      placeholder: 'City',
    },
    {
      id: 'zip-code',
      type: 'number',
      placeholder: 'Zip code',
    },
    {
      id: 'country',
      type: 'text',
      placeholder: 'Country',
    },
  ],
];