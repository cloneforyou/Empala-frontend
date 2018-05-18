import { countriesList } from './countriesList';

export const dataFields = [
  [
    {
      id: 'regulatory_identification_dateOfBirth',
      field: 'date',
      label: 'Date of birth',
      birthDay: true,
    },
    {
      id: 'regulatory_identification_ssn',
      label: 'Government tax ID (SSN / SIN)',
      type: 'text',
      field: 'input',
      placeholder: '',
    },
    {
      id: 'regulatory_identification_citizenship',
      label: 'Country of citizenship',
      hint: 'Please select',
      field: 'select',
      options: countriesList,
    },
  ],
  [
    {
      id: 'regulatory_family_martial_status',
      hint: 'Please select',
      label: 'Marital status',
      field: 'select',
      options: [
        {
          value: 'Single',
          title: 'Single',
        },
        {
          value: 'Married',
          title: 'Married',
        },
        {
          value: 'Domestic Partner',
          title: 'Domestic Partner',
        },
        {
          value: 'Divorced',
          title: 'Divorced',
        },
        {
          value: 'Widowed',
          title: 'Widowed',
        },
      ],
    },
    {
      label: 'No of dependents',
      id: 'regulatory_family_dependents',
      field: 'input',
      type: 'text',
      numberField: true,
    },
    {
      id: 'regulatory_family_investment_experience',
      hint: 'Please select',
      label: 'Investment experience',
      field: 'select',
      options: [
        {
          value: 'None',
          title: 'None',
        },
        {
          value: 'Limited',
          title: 'Limited',
        },
        {
          value: 'Good',
          title: 'Good',
        },
        {
          value: 'Excellent',
          title: 'Excellent',
        },
      ],
    },
  ],
];

export { dataFields as default };