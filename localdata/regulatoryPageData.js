import { countriesList } from './countriesList';
import { getValuesForSelectField } from '../utils/registrationUtils';
import { statesAbbvs, usStatesList } from '../localdata/usStatesList';

const usStates = getValuesForSelectField(usStatesList);
const states = Object.keys(statesAbbvs);
const selectOptions = usStates.map((option, index) => ({ value: option.value, title: option.value, label: states[index] }));

export const options = {
  prefix: [{
    value: 'Mr',
    title: 'Mr',
  }, {
    value: 'Mrs',
    title: 'Mrs',
  }, {
    value: 'Ms',
    title: 'Ms',
  }, {
    value: 'Dr',
    title: 'Dr',
  }],
  state: selectOptions,
  country: [{
    value: 'United States',
    title: 'United States',
  }],
  duplicate: [{
    value: 'Postal',
    title: 'Postal',
  }],
};

export const duplicateForm = [
  {
    field: 'select',
    id: 'regulatory_duplicate_prefix',
    label: 'Title',
    options: options.prefix,
    value: 'Mr',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_first_name',
    label: 'First name',
    value: 'John',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_surname',
    label: 'Surname',
    value: 'Kennedy',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_title',
    label: 'Title',
    value: 'Compliance Officer',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_company',
    label: 'Company',
    value: 'Acme Corporation Ltd.',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_address_line_1',
    label: 'Address line 1',
    value: '32 Ross Common',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_address_line_2',
    label: 'Address line 2',
    value: 'Suite 200',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_zipcode',
    label: 'Zipcode',
    value: '94000',
    type: 'text',
    col: 6,
    placeholder: '',
  },
  {
    field: 'select',
    id: 'regulatory_duplicate_state',
    label: 'State',
    value: 'California',
    options: options.state,
    col: 6,
    autoWidth: true,
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_city',
    label: 'City',
    value: 'San Francisco',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'select',
    id: 'regulatory_duplicate_country',
    label: 'Country',
    value: 'United States',
    options: options.country,
    type: 'text',
  },
];

export const duplicateDelivery = [
  {
    field: 'select',
    id: 'regulatory_duplicate_delivery',
    label: 'Duplicate Delivery',
    value: 'Postal',
    options: options.duplicate,
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_statements',
    label: 'Statements',
    value: '1',
    type: 'text',
    placeholder: '',
  },
  {
    field: 'input',
    id: 'regulatory_duplicate_trade_confirmations',
    label: 'Trade Confirmations',
    value: '1',
    type: 'text',
    placeholder: '',
  },
];

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
      id: 'regulatory_duplicTE_FORM',
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
      hint: 'Please select',
      field: 'select',
      col: 6,
      options: (() => {
        const out = [];
        for (let i = 0; i < 100; i++) {
          out.push({
            value: `${i}`,
            title: `${i}`,
          });
        }
        return out;
      })(),
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
