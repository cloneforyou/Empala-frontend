import { countriesList } from './countriesList';

export const dataFields = [
  [
    {
      field: 'checkbox',
      label: `I am (or a an immediate family member who resides
      in the same household as me is) employed by or a
      member of a registered broker-dealer, securities or
      futures exchange, futures commission merchant, retail
      foreign exchange dealer, or securities or futures industry
      regulatory  body (e.g. FINRA, NFA).`,
      id: 'regulatory_checkbox_1',
    },
    {
      field: 'checkbox',
      label: 'I am a director, policy maker, or a senior officer of a publicly traded company.',
      id: 'regulatory_checkbox_2',
    },
    {
      field: 'checkbox',
      label: 'I am a 10% shareholder of a publicly traded company.',
      id: 'regulatory_checkbox_3',
    },
    {
      field: 'checkbox',
      label: 'I am a senior military, governmental or political official in a non-US country.',
      id: 'regulatory_checkbox_4',
    },
    {
      field: 'checkbox',
      label: 'I have been notified by the IRS that I am subject to backup withholding.',
      id: 'regulatory_checkbox_5',
    },
  ],
  [
    {
      id: 'regulatory_identification_dateOfBirth',
      field: 'date',
      label: 'Date of birth',
      birthDay: true,
      col: 6,
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
      autoWidth: true,
    },
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
      typeField: 'numberField',
      col: 6,
    },
    {
      id: 'regulatory_identification_investment_experience',
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
          value: 'Extensive',
          title: 'Extensive',
        },
      ],
    },
  ],
];

export { dataFields as default };
