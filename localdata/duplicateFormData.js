import { usStatesList } from './usStatesList';

const usStates = usStatesList.map(el => ({
  value: el,
  title: el,
}));

const options = {
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
  // state: usStates,
  country: [{
    value: 'United States',
    title: 'United States',
  }],
  duplicate: [{
    value: 'Postal',
    title: 'Postal',
  }],
};

const duplicateForm = [
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
    options: usStates,
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

const duplicateDelivery = [
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

export {
  duplicateForm,
  duplicateDelivery,
};
