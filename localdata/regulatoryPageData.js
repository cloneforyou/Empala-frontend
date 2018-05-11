export const dataFields = [
  // identification
  [
    {
      id: 'regulatory_identification_ssn',
      label: 'Government tax ID (SSN / SIN)',
      type: 'text',
      placeholder: '',
    },

    {
      label: 'Country of citizenship',
      id: 'regulatory_identification_citizenship',
      type: 'text',
      placeholder: '',
    },
  ],

  // family
  [
    {
      id: 'regulatory_family_martial_status',
      hint: 'Please select',
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
      id: 'regulatory_family__dependents',
      type: 'number',
      placeholder: '',
    },

    {
      id: 'regulatory_family_investment_experience',
      hint: 'Please select',
      label: 'Investment experience',
      options: [
        {
          value: 'None',
          title: 'None'
        },
      ],
    }

  ]
];