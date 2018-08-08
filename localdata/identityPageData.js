import { getValuesForSelectField } from '../utils/registrationUtils';
import { usStatesList } from './usStatesList';

const usStates = getValuesForSelectField(usStatesList);

export const dataFields = [
  [
    {
      id: 'identity_residential_address_residential_address_line_1',
      field: 'input',
      label: 'Residential address line 1',
      type: 'text',
      placeholder: '',
    },
    {
      id: 'identity_residential_address_residential_address_line_2',
      field: 'input',
      label: 'Residential address line 2',
      type: 'text',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Zip code',
      id: 'identity_zip_code',
      type: 'text',
      typeField: 'numberField',
      placeholder: '',
      col: 6,
    },
    {
      id: 'identity_residential_address_residential_address_state',
      hint: 'Please select',
      field: 'select',
      label: 'State',
      options: usStates,
      autoWidth: true,
      col: 6,
    },
    {
      id: 'identity_residential_address_residential_address_city',
      hint: 'Please select',
      field: 'input',
      label: 'City',
      type: 'text',
    },
    {
      id: 'identity_residential_address_residential_address_country',
      hint: 'Please select',
      field: 'select',
      label: 'Country',
      options: [
        {
          value: 'United States',
          title: 'United States',
        },
      ],
    },
    {
      id: 'identity_residential_address_same_mailing_address_checkbox',
      field: 'checkbox',
      label: 'Mailing address is the same.',
    },
  ],
  [
    {
      id: 'identity_mailing_address_residential_address_line_1',
      field: 'input',
      label: 'Mailing address line 1',
      type: 'text',
      placeholder: '',
    },
    {
      id: 'identity_mailing_address_residential_address_line_2',
      field: 'input',
      label: 'Mailing address line 2',
      type: 'text',
      placeholder: '',
    },
    {
      id: 'identity_mailing_address_zip_code',
      field: 'input',
      label: 'Zip code',
      type: 'text',
      typeField: 'numberField',
      placeholder: '',
      col: 6,
    },
    {
      id: 'identity_mailing_address_state',
      hint: 'Please select',
      field: 'select',
      label: 'State',
      options: usStates,
      col: 6,
    },
    {
      id: 'identity_mailing_address_city',
      field: 'input',
      label: 'City',
      type: 'text',
    },
    {
      id: 'identity_mailing_address_country',
      hint: 'Please select',
      field: 'select',
      label: 'Country',
      options: [
        {
          value: 'United States',
          title: 'United States',
        },
      ],
    },
  ],
];

export { dataFields as default };
