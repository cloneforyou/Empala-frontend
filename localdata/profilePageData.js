import { getValuesForSelectField } from '../utils/registrationUtils';
import { usStatesList } from './usStatesList';

const usStates = getValuesForSelectField(usStatesList);

export const dataFields = [
  // employment
  [
    {
      id: 'profile_employment_employment_type',
      label: 'Employment type',
      hint: 'Please select',
      options: [
        {
          value: 'Employed',
          title: 'Employed',
        },
        {
          value: 'Self-employed',
          title: 'Self-employed',
        },
        {
          value: 'Not employed',
          title: 'Not employed',
        },
        {
          value: 'Retired',
          title: 'Retired',
        },
      ],
    },

    {
      id: 'profile_employment_employment_country',
      label: 'Employment сountry',
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
      type: 'text',
      numberField: true,
      col: 6,
      placeholder: '',
    },

    {
      id: 'profile_employment_state',
      hint: 'Please select',
      label: 'State',
      col: 6,
      options: usStates,
      autoWidth: true,
    },
    {
      id: 'profile_employment_city',
      field: 'input',
      label: 'City',
      type: 'text',
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
          value: '0 - 50,000',
          title: '0 – 50,000',
        },
        {
          value: '50,001 – 100,000',
          title: '50,001 – 100,000',
        },
        {
          value: '100,001 – 200,000',
          title: '100,001 – 200,000',
        },
        {
          value: '200,001 – 500,000',
          title: '200,001 – 500,000',
        },
        {
          value: '500,001 – 5,000,000',
          title: '500,001 – 5,000,000',
        },
        {
          value: 'Greater than 5,000,000',
          title: 'Greater than 5,000,000',
        },
      ],
    },

    {
      label: 'Total net worth',
      id: 'profile_financials_total_net_worth',
      hint: 'Please select',
      options: [
        {
          value: '0 – 100,000',
          title: '0 – 100,000',
        },
        {
          value: '100,001 – 200,000',
          title: '100,001 – 200,000',
        },
        {
          value: '200,001 – 400,000',
          title: '200,001 – 400,000',
        },
        {
          value: '400,001 – 1,000,000',
          title: '400,001 – 1,000,000',
        },
        {
          value: '1,000,001 – 10,000,000',
          title: '1,000,001 – 10,000,000',
        },
        {
          value: 'Greater than 10,000,000',
          title: 'Greater than 10,000,000',
        },
      ],
    },

    {
      label: 'Liquid net worth',
      id: 'profile_financials_liquid_net_worth',
      hint: 'Please select',
      options: [
        {
          value: '0 – 100,000',
          title: '0 – 100,000',
        },
        {
          value: '100,001 – 200,000',
          title: '100,001 – 200,000',
        },
        {
          value: '200,001 – 400,000',
          title: '200,001 – 400,000',
        },
        {
          value: '400,001 – 1,000,000',
          title: '400,001 – 1,000,000',
        },
        {
          value: '1,000,001 – 10,000,000',
          title: '1,000,001 – 10,000,000',
        },
        {
          value: 'Greater than 10,000,000',
          title: 'Greater than 10,000,000',
        },
      ],
    },

    {
      id: 'profile_financials_tax_rate_profile',
      label: 'Tax rate profile',
      hint: 'Please select',
      options: [
        {
          value: 'Low',
          title: 'Low',
        },
        {
          value: 'Medium',
          title: 'Medium',
        },
        {
          value: 'High',
          title: 'High',
        },
      ],
    },

    {
      id: 'profile_financials_investment_objectives',
      hint: 'Please select',
      label: 'Investment objectives',
      options: [
        {
          value: 'Capital preservation (low risk)',
          title: 'Capital preservation (low risk)',
        },
        {
          value: 'Income (low-medium risk)',
          title: 'Income (low-medium risk)',
        },
        {
          value: 'Growth & income (medium risk)',
          title: 'Growth & income (medium risk)',
        },
        {
          value: 'Growth (medium-high risk)',
          title: 'Growth (medium-high risk)',
        },
        {
          value: 'Speculation (high risk)',
          title: 'Speculation (high risk)',
        },
      ],
    },
  ],
];
