export const dataFields = [
  // employment
  [
    {
      id: 'profile_employment_employment_type',
      label: 'Employment type',
      type: 'text',
      placeholder: '',
    },

    {
      id: 'profile_employment_employment_country',
      label: 'Employment country',
      type: 'text',
      placeholder: '',
    },

    {
      id: 'profile_employment_employer_name',
      label: 'Employer name',
      type: 'text',
      placeholder: '',
    },

    {
      label: 'Zip code',
      id: 'profile_employment_zip_code',
      type: 'number',
      placeholder: '',
    },

    {
      id: 'profile_employment_state',
      hint: 'Please select',
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
      id: 'profile_employment_city',
      hint: 'Please select',
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
      id: 'profile_financials_annual_income',
      hint: 'Please select',
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
      id: 'profile_financials_total_net_worth',
      type: 'text',
      placeholder: '',
    },

    {
      label: 'Liquid net worth',
      id: 'profile_financials_liquid_net_worth',
      type: 'text',
      placeholder: '',
    },

    {
      id: 'profile_financials_tax_rate_profile',
      label: 'Tax rate profile',
      hint: 'Please select',
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
      id: 'profile_financials_investment_objectives',
      hint: 'Please select',
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