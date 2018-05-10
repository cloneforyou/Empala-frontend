// Data fields for page input elements
// obj {
//       id: '',
//       type: '',
//       placeholder: '',
//     }
// for <input> elements
// {
//   label: '',
//     options: [],
// }
// for select elements

export const dataFields = [
  // residential address
  [
    {
      label: 'Residential address line 1',
      id: 'identity_residential_address_line_1',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Residential address line 2',
      id: 'identity_residential_address_line_2',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Zip code',
      id: 'identity_zip_code',
      type: 'number',
      placeholder: '',
    },
    {
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
    {
      label: 'Country',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },
    // {
    //   id: 'birthdate',
    //   type: 'date',
    //   label: 'Date of birth',
    //   // placeholder: '11/12/1987',
    // },
    // {
    //   id: 'ssn',
    //   type: 'number',
    //   placeholder: 'SSN (Social Security Number)',
    // },
  ],
  // mailing address
  [
    {
      label: 'Mailing address line 1',
      id: 'identity_residential_address_line_1',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Mailing address line 2',
      id: 'identity_residential_address_line_2',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Zip code',
      id: 'identity_zip_code',
      type: 'number',
      placeholder: '',
    },
    {
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
    {
      label: 'Country',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },
    // {
    //   label: 'Investor experience',
    //   options: [
    //     {
    //       value: '0',
    //       title: 'Option 1'
    //     },
    //     {
    //       value: '2',
    //       title: 'Option 2'
    //     },
    //     {
    //       value: '3',
    //       title: 'Option 3'
    //     },
    //   ],
    // },
    // {
    //   label: 'Years experience',
    //   options: [
    //     {
    //       value: '0',
    //       title: 'No experience'
    //     },
    //     {
    //       value: '1',
    //       title: 'One year'
    //     },
    //     {
    //       value: '2',
    //       title: 'Up to three years'
    //     },
    //   ],
    // },
    // {
    //   label: 'Citizenship',
    //   options: [
    //     {
    //       value: 'Afghans',
    //       title: 'Afghans'
    //     },
    //     {
    //       value: 'Albanians',
    //       title: 'Albanians'
    //     },
    //     {
    //       value: 'Algerians',
    //       title: 'Algerians'
    //     },
    //     {
    //       value: 'Americans',
    //       title: 'Americans'
    //     },
    //   ],
    // },
  ],
  // trusted contact person
  [
    {
      label: 'First name',
      id: 'identity_trusted_contact_person_first_name',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Last name',
      id: 'identity_trusted_contact_person_last_name',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Email',
      id: 'identity_trusted_contact_person_email',
      type: 'email',
      placeholder: '',
    },
    {
      label: 'Contact phone no.',
      id: 'identity_trusted_contact_person_phone',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Relationship',
      id: 'identity_trusted_contact_person_relationship',
      type: 'text',
      placeholder: '',
    },
    // {
    //   label: 'Annual income',
    //   options: [
    //     {
    //       value: 30000,
    //       title: '< 30 000$'
    //     },
    //     {
    //       value: 50000,
    //       title: '30 000 - 50 000$'
    //     },
    //     {
    //       value: 100000,
    //       title: '50 000$ - 100 000$'
    //     },
    //     {
    //       value: 2000000,
    //       title: '> 100 000$'
    //     },
    //   ],
    // },
    // {
    //   label: 'Marital status',
    //   options: [
    //     {
    //       value: 'married',
    //       title: 'Married'
    //     },
    //     {
    //       value: 'unmarried',
    //       title: 'Unmarried'
    //     },
    //     {
    //       value: 'divorced',
    //       title: 'Divorced'
    //     },
    //   ],
    // },
    // {
    //   label: 'Primary objective',
    //   options: [
    //     {
    //       value: 'value1',
    //       title: 'Objective 1'
    //     },
    //     {
    //       value: 'value2',
    //       title: 'Objective 2'
    //     },
    //     {
    //       value: 'value3',
    //       title: 'Objective 3'
    //     },
    //   ],
    // },
    // {
    //   label: 'Employment status',
    //   options: [
    //     {
    //       value: 'part time employee',
    //       title: 'Part time employee'
    //     },
    //     {
    //       value: 'full time employee',
    //       title: 'Full time employee'
    //     },
    //     {
    //       value: 'employer',
    //       title: 'Employer'
    //     },
    //   ],
    // },
  ],
  // regulatory questions
  [
    // {
    //   id: 'employers-name',
    //   type: 'text',
    //   placeholder: 'Employers name',
    // },
    // {
    //   id: 'address-line1',
    //   type: 'number',
    //   placeholder: 'Address line 1',
    // },
    // {
    //   id: 'address-line2',
    //   type: 'number',
    //   placeholder: 'Address line 1',
    // },
    // {
    //   id: 'city',
    //   type: 'text',
    //   placeholder: 'City',
    // },
    // {
    //   id: 'zip-code',
    //   type: 'number',
    //   placeholder: 'Zip code',
    // },
    // {
    //   id: 'country',
    //   type: 'text',
    //   placeholder: 'Country',
    // },

  ],
];