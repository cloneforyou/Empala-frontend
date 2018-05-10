export const dataFields = [
  // employment
  [
    {
      label: 'Employment type',
      id: 'employment_type',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Employment country',
      id: 'employment_country',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Employer name',
      id: 'employment_employer_name',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Zip code',
      id: 'employment_zip_code',
      type: 'number',
      placeholder: '',
    },
    {
      label: 'State',
      options: [
        {
          value: 'Alabama',
          title: 'Alabama'
        },
        {
          value: 'California',
          title: 'California'
        },
        {
          value: 'Dakota',
          title: 'Dakota'
        },
        {
          value: 'Missouri',
          title: 'Missouri'
        },
      ],
    },
    {
      label: 'City',
      options: [
        {
          value: 'Boston',
          title: 'Boston'
        },
        {
          value: 'New York',
          title: 'New York'
        },
        {
          value: 'San Francisco',
          title: 'San Francisco'
        },
      ],
    },
  ],
  // Financials
  [
    {
      label: 'Annual income',
      options: [
        {
          value: '<100000',
          title: 'Less than 100,000'
        },
        {
          value: '100000-250000',
          title: '100,000 - 250,000'
        },
        {
          value: '250000-500000',
          title: '250,000 - 500,000'
        },
        {
          value: '500000-1000000',
          title: '500,000 - 1,000,000'
        },
        {
          value: '>1000000',
          title: 'More than 1,000,000'
        },
      ],
    },
    {
      label: 'Total net worth',
      id: 'financials_total_net_worth',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Liquid net worth',
      id: 'financials_liquid_net_worth',
      type: 'text',
      placeholder: '',
    },
    {
      id: 'financials_tax_rate_profile',
      label: 'Tax rate profile',
      options: [
        {
          value: 'Low',
          title: 'Low'
        },
        {
          value: 'High',
          title: 'High'
        },
      ],
    },
    {
      label: 'Investment objectives',
      options: [
        {
          value: 'Speculation',
          title: 'Speculation (high risk)'
        },
      ],
    },
  ]
];