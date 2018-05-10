export const dataFields = [
  // identification
  [
    {
      label: 'Government tax ID (SSN / SIN)',
      id: 'identification_ssn',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Country of citizenship',
      id: 'identification_citizenship',
      type: 'text',
      placeholder: '',
    },
  ],
  // family
  [
    {
      label: 'Martial status',
      options: [
        {
          value: 'Married',
          title: 'Married'
        },
        {
          value: 'Single',
          title: 'Single'
        },
      ],
    },
    {
      label: 'No. of dependents',
      id: 'family_dependents',
      type: 'number',
      placeholder: '',
    },
    {
      label: 'Investment experience',
      options: [
        {
          value: 'None',
          title: 'None'
        },
      ],
    },
  ]
];