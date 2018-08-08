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
  [
    {
      field: 'checkbox',
      label: `I am (or a an immediate family member who resides
      in the same household as me is) employed by or a
      member of a registered broker-dealer, securities or
      futures exchange, futures commission merchant, retail
      foreign exchange dealer, or securities or futures industry
      regulatory  body (e.g. FINRA, NFA).`,
      id: 'identity_checkbox_1',
    },
    {
      field: 'checkbox',
      label: 'I am a director, policy maker, or a senior officer of a publicly traded company.',
      id: 'identity_checkbox_2',
    },
    {
      field: 'checkbox',
      label: 'I am a 10% shareholder of a publicly traded company.',
      id: 'identity_checkbox_3',
    },
    {
      field: 'checkbox',
      label: 'I am a senior military, governmental or political official in a non-US country.',
      id: 'identity_checkbox_4',
    },
    {
      field: 'checkbox',
      label: 'I have been notified by the IRS that I am subject to backup withholding.',
      id: 'identity_checkbox_5',
    },
  ],
];

export { dataFields as default };
