import { countriesList } from './countriesList';
import { usStatesList } from './usStatesList';
import { getValuesForSelectField } from '../utils/registrationUtils';

const usStates = getValuesForSelectField(usStatesList);

export const fieldsFullName = [
  {
    id: 'basic_information_prefix',
    hint: 'Select',
    label: 'Prefix',
    col: 4,
    options: [
      {
        value: 'Mr',
        title: 'Mr',
      },
      {
        value: 'Mrs',
        title: 'Mrs',
      },
      {
        value: 'Ms',
        title: 'Ms',
      },
      {
        value: 'Dr',
        title: 'Dr',
      },
    ],
  },
  {
    id: 'basic_information_first_name',
    type: 'text',
    label: 'First name',
    placeholder: '',
    col: 8,
  },
  {
    id: 'basic_information_middle_name',
    type: 'text',
    label: 'Middle name',
    placeholder: '',
    col: 4,
  },
  {
    id: 'basic_information_second_middle_name',
    type: 'text',
    label: 'Middle name 2',
    placeholder: '',
    col: 4,
  },
  {
    id: 'basic_information_third_middle_name',
    type: 'text',
    label: 'Middle name 3',
    placeholder: '',
    col: 4,
  },
  {
    id: 'basic_information_last_name',
    type: 'text',
    label: 'Last name',
    placeholder: '',
    col: 8,
  },
  {
    id: 'basic_information_suffix',
    hint: 'Select',
    label: 'Suffix',
    col: 4,
    options: [
      {
        value: ' ',
        title: ' ',
      },
      {
        value: 'Jr',
        title: 'Jr',
      },
      {
        value: 'Sr',
        title: 'Sr',
      },
      {
        value: 'II',
        title: 'II',
      },
      {
        value: 'III',
        title: 'III',
      },
    ],
  },
];

export const fieldsMembership = [
  {
    id: 'member_basic_information_full_name',
    type: 'text',
    label: 'Full name',
    placeholder: '',
  },
  {
    id: 'account_information_email',
    type: 'text',
    label: 'E-mail address',
    placeholder: '',
    field: 'input',
  },
  {
    id: 'account_information_contact_phone_number',
    type: 'text',
    label: 'Mobile No.  (we will text you to verify the number)',
    placeholder: '',
    field: 'input',
    disabled: true,
  },
  {
    id: 'regulatory_identification_date_of_birth',
    field: 'date',
    label: 'Date of birth',
    birthDay: true,
    col: 6,
  },
  {
    id: 'regulatory_identification_martial_status',
    hint: 'Please select',
    label: 'Marital status',
    field: 'select',
    col: 6,
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
    id: 'regulatory_identification_ssn',
    label: 'Government tax ID (SSN / SIN)',
    type: 'text',
    field: 'input',
    placeholder: '',
    col: 6,
  },
  {
    label: 'No of dependents',
    id: 'regulatory_identification_number_of_dependents',
    field: 'input',
    type: 'text',
    typeField: 'numberField',
    col: 6,
  },
  {
    id: 'regulatory_identification_country_of_citizenship',
    label: 'Country of citizenship',
    field: 'input',
    type: 'text',
    placeholder: '',
    disabled: true,
  },
];

export const fieldsResidencyStatus = [
  {
    id: 'regulatory_identification_residency_status',
    label: 'Residency Status',
    field: 'input',
    type: 'text',
    placeholder: '',
    disabled: true,
  },
];

export const fieldsVisaType = [
  {
    id: 'regulatory_identification_visa_type',
    label: 'Visa type',
    field: 'input',
    type: 'text',
    placeholder: '',
    disabled: true,
    col: 6,
  },
  {
    id: 'regulatory_identification_visa_expiry_date',
    field: 'date',
    label: 'Visa expiry date',
    disabled: true,
    col: 6,
  },
];

export const fieldsResidentialAddress = [
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
    id: 'identity_residential_address_city',
    hint: 'Please select',
    field: 'input',
    label: 'City',
    type: 'text',
  },
  {
    field: 'input',
    label: 'Zip code',
    id: 'identity_residential_address_zip_code',
    type: 'text',
    typeField: 'numberField',
    placeholder: '',
    col: 6,
  },
  {
    id: 'identity_residential_address_state',
    hint: 'Please select',
    field: 'select',
    label: 'State',
    options: usStates,
    autoWidth: true,
    col: 6,
  },
  {
    id: 'identity_residential_address_country',
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
];

export const fieldsMaillingAddress = [
  {
    id: 'identity_mailing_address_mailing_address_line_1',
    field: 'input',
    label: 'Address line 1',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'identity_mailing_address_mailing_address_line_2',
    field: 'input',
    label: 'Address line 2',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'identity_mailing_address_city',
    hint: 'Please select',
    field: 'input',
    label: 'City',
    type: 'text',
  },
  {
    field: 'input',
    label: 'Zip code',
    id: 'identity_mailing_address_zip_code',
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
    autoWidth: true,
    col: 6,
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
];

export const fieldsPersonalWealth = [
  {
    id: 'profile_financials_annual_income',
    hint: 'Please select',
    label: 'Annual income',
    field: 'select',
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
    field: 'select',
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
    field: 'select',
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
    field: 'select',
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
];

export const fieldsMemberPersonal = [
  {
    id: 'account_information_account_number',
    type: 'text',
    label: 'Membership No.',
    placeholder: '',
    field: 'input',
    disabled: true,
  },
  {
    id: 'createdat',
    type: 'text',
    label: 'Member since',
    placeholder: '',
    field: 'input',
    disabled: true,
  },
];

export const fieldResetPassword = [
  {
    id: 'member_account_password_reset',
    type: 'password',
    label: 'Reset Password',
    field: 'input',
  },
];

export const fieldsEmployment = [
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
    id: 'profile_employment_employer_name',
    label: 'Employer name',
    type: 'text',
    placeholder: '',
  },

  {
    id: 'profile_employment_city',
    field: 'input',
    label: 'City',
    type: 'text',
  },
  {
    label: 'Zip code',
    id: 'profile_employment_zip_code',
    type: 'text',
    typeField: 'numberField',
    col: '6',
    placeholder: '',
  },

  {
    id: 'profile_employment_state',
    hint: 'Please select',
    label: 'State',
    col: '6',
    options: usStates,
    autoWidth: true,
  },
  {
    id: 'profile_employment_employment_country',
    label: 'Employment сountry',
    type: 'select',
    placeholder: '',
    options: countriesList,
  },
];

export const fieldsTrustedContactPerson = [
  {
    id: 'trusted_contact_first_name',
    label: 'First name',
    type: 'text',
    placeholder: '',
    col: 6,
  },
  {
    id: 'trusted_contact_last_name',
    label: 'Last name',
    type: 'text',
    placeholder: '',
    col: 6,
  },
  {
    id: 'trusted_contact_email',
    label: 'Email address',
    type: 'text',
    placeholder: '',
  },
  {
    id: 'trusted_contact_relationship',
    label: 'Relationship',
    type: 'text',
    placeholder: '',
  },
];

export const AccountStatements = [
  {
    id: Math.random(),
    title: 'April 2018 Account Statement',
  },
  {
    id: Math.random(),
    title: 'March 2018 Account Statement',
  },
  {
    id: Math.random(),
    title: 'February 2018 Account Statement',
  },
  {
    id: Math.random(),
    title: 'January 2018 Account Statement',
  },
  {
    id: Math.random(),
    title: 'December 2017 Account Statement',
  },
  {
    id: Math.random(),
    title: 'November 2017 Account Statement',
  },
];

const options = [
  {
    value: 'None',
    title: 'No experience',
  },
  {
    value: '<1',
    title: '< 1 year',
  },
  {
    value: '1-2',
    title: '1 - 2 years',
  },
  {
    value: '2-5',
    title: '2 - 5 years',
  },
  {
    value: '>5',
    title: '> 5 years',
  },
];

export const fieldsInvestmentExperienceOne = [
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
        value: 'Excellent',
        title: 'Excellent',
      },
    ],
  },
  {
    id: 'profile_investment_experience_equities',
    hint: 'Please select',
    label: 'Equities',
    options,
  },
  {
    id: 'profile_investment_experience_options',
    label: 'Options',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_bonds',
    label: 'Bonds',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_margin_currencies',
    label: 'Currencies',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_futures',
    label: 'Futures',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_foreign_markets',
    label: 'Foreign markets',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
];

export const fieldsInvestmentExperienceTwo = [
  {
    id: 'profile_financials_investment_objectives',
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
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'profile_investment_experience_cryptocurrencies',
    label: 'Cryptocurrencies',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_private_equity',
    label: 'Private equity',
    options,
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'profile_investment_experience_margin_accounts',
    label: 'Margin accounts',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_borrowing_money',
    label: 'Borrowing money',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_lending_money',
    label: 'Lending money',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
  {
    id: 'profile_investment_experience_exotics',
    label: 'Exotics',
    hint: 'Please select',
    autoWidth: true,
    options,
  },
];

export const fieldsDefaultOrderOptions = [
  {
    id: 'default_order_options_type',
    label: 'Order type',
    options: [
      {
        value: 'Individual',
        title: 'Individual',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'default_order_options_quantity',
    label: 'Quantity',
    options: [
      {
        value: '100',
        title: '100',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'default_order_options_duration',
    label: 'Duration',
    options: [
      {
        value: 'Day',
        title: 'Day',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'default_order_options_checkbox',
    label: 'All or none',
    type: 'checkbox',
  },
  {
    id: 'default_order_options_exchange',
    label: 'Exchange',
    options: [
      {
        value: 'Day',
        title: 'Day',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'default_order_options_spreads',
    label: 'Spreads',
    options: [
      {
        value: 'Day',
        title: 'Day',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
];

export const fieldsAccountFirst = [

  {
    id: 'account_value',
    label: 'Account value',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_pending_order',
    label: 'Pending order count',
    options: [
      {
        value: '9999',
        title: '9999',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_stock_buying',
    label: 'Stock buying power',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_option_buying',
    label: 'Option buying power',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_day_trading',
    label: 'Day trading buying power',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
];

export const fieldsAccountSecond = [

  {
    id: 'account_maintenance_margin',
    label: 'Maintenance margin',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_option_maintenance',
    label: 'Option maintenance margin',
    options: [
      {
        value: '9999',
        title: '9999',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_urealized',
    label: 'Unrealized P/L',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_realized',
    label: 'Realized P/L today',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
  {
    id: 'account_position_market',
    label: 'Position market value',
    options: [
      {
        value: '$99,999,999.99',
        title: '$99,999,999.99',
      },
    ],
    hint: 'Please select',
    autoWidth: true,
  },
];
