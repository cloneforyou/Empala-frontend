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
    //todo replace when actual data been provided
    {
      label: 'Bank name',
      options: [
        {
          value: 'Bank name 1',
          title: 'Bank name 1',
        },
        {
          value: 'Bank name 2',
          title: 'Bank name 2',
        },
        {
          value: 'Bank name 3',
          title: 'Bank name 3',
        },
      ],
    },
    {
      label: 'Routing',
      options: [
        {
          value: 'Routing1',
          title: 'Routing 1',
        },
        {
          value: 'Routing 2',
          title: 'Routing 2',
        },
        {
          value: 'Routing 3',
          title: 'Routing 3',
        },
      ],
    },
    {
      label: 'Account',
      options: [
        {
          value: 'Account',
          title: 'Account',
        },
      ],
    },
    {
      label: 'Account type',
      options: [
        {
          value: 'Type1',
          title: 'Type 1',
        },
        {
          value: 'Type2',
          title: 'Type 2',
        },
      ],
    },
    {
      id: 'account-number',
      type: 'text',
      placeholder: 'Account number',
    },
    {
      id: 'banking-password',
      type: 'password',
      placeholder: 'Banking password',
    },
  ],
];