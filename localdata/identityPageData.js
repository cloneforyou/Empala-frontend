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
      id: 'birthdate',
      type: 'date',
      label: 'Date of birth',
      placeholder: '11/12/1987',
    },
    {
      id: 'ssn',
      type: 'number',
      placeholder: 'SSN (Social Security Number)',
    },
  ],
  [//todo replace when actual data been provided
    {
      label: 'Investor experience',
      options: [
        {
          value: '0',
          title: 'Option 1'
        },
        {
          value: '2',
          title: 'Option 2'
        },
        {
          value: '3',
          title: 'Option 3'
        },
      ],
    },
    {
      label: 'Years experience',
      options: [
        {
          value: '0',
          title: 'No experience'
        },
        {
          value: '1',
          title: 'One year'
        },
        {
          value: '2',
          title: 'Up to three years'
        },
      ],
    },
    {
      label: 'Citizenship',
      options: [
        {
          value: 'Afghans',
          title: 'Afghans'
        },
        {
          value: 'Albanians',
          title: 'Albanians'
        },
        {
          value: 'Algerians',
          title: 'Algerians'
        },
        {
          value: 'Americans',
          title: 'Americans'
        },
      ],
    },
  ],
  [
    //todo replace when actual data been provided
    {
      label: 'Annual income',
      options: [
        {
          value: 30000,
          title: '< 30 000$'
        },
        {
          value: 50000,
          title: '30 000 - 50 000$'
        },
        {
          value: 100000,
          title: '50 000$ - 100 000$'
        },
        {
          value: 2000000,
          title: '> 100 000$'
        },
      ],
    },
    {
      label: 'Marital status',
      options: [
        {
          value: 'married',
          title: 'Married'
        },
        {
          value: 'unmarried',
          title: 'Unmarried'
        },
        {
          value: 'divorced',
          title: 'Divorced'
        },
      ],
    },
    {
      label: 'Primary objective',
      options: [
        {
          value: 'value1',
          title: 'Objective 1'
        },
        {
          value: 'value2',
          title: 'Objective 2'
        },
        {
          value: 'value3',
          title: 'Objective 3'
        },
      ],
    },
    {
      label: 'Employment status',
      options: [
        {
          value: 'part time employee',
          title: 'Part time employee'
        },
        {
          value: 'full time employee',
          title: 'Full time employee'
        },
        {
          value: 'employer',
          title: 'Employer'
        },
      ],
    },
  ],
  [
    {
      id: 'employers-name',
      type: 'text',
      placeholder: 'Employers name',
    },
    {
      id: 'address-line1',
      type: 'number',
      placeholder: 'Address line 1',
    },
    {
      id: 'address-line2',
      type: 'number',
      placeholder: 'Address line 1',
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