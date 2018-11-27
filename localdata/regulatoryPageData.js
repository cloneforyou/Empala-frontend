import { countriesList } from './countriesList';
import { duplicateForm } from './duplicateFormData';
import { getValuesForSelectField } from '../utils/registrationUtils';

const residencyOptions = getValuesForSelectField(['Permanent Resident', 'Business Visa', 'Other']);
const visaTypes = getValuesForSelectField([
  'B1',
  'C1',
  'E1',
  'E2',
  'E3',
  'F1',
  'H1B',
  'H2B',
  'H3',
  'K1',
  'L1',
  'TN',
  'OTHER',
]);

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
  duplicateForm,
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
      id: 'regulatory_identification_residency_status',
      label: 'Residency Status',
      hint: 'Please select',
      field: 'select',
      options: residencyOptions,
      autoWidth: true,
    },
    {
      id: 'regulatory_identification_visa_type',
      label: 'Visa type',
      hint: 'Please select',
      field: 'select',
      options: visaTypes,
      // autoWidth: true,
      col: 6,
    },
    {
      id: 'member_passport_visa_expiry_date',
      label: 'Visa expiry date',
      field: 'date',
      col: 6,
      dateExpiry: true,
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
