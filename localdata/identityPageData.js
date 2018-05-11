export const dataFields = [
  // residential address
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
      type: 'number',
      placeholder: '',
    },

    {
      id: 'identity_residential_address_residential_address_state',
      hint: 'Please select',
      field: 'select',
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
      id: 'identity_residential_address_residential_address_city',
      hint: 'Please select',
      field: 'select',
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
      id: 'identity_residential_address_residential_address_country',
      hint: 'Please select',
      field: 'select',
      label: 'Country',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },

    {
      id: 'identity_residential_address_same_mailing_address_checkbox',
      field: 'checkbox',
      label: `Mailing address is the same.`,
    }
  ],

  // mailing address
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
      type: 'number',
      placeholder: '',
    },

    {
      id: 'identity_mailing_address_state',
      hint: 'Please select',
      field: 'select',
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
      id: 'identity_mailing_address_city',
      hint: 'Please select',
      field: 'select',
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
      id: 'identity_mailing_address_country',
      hint: 'Please select',
      field: 'select',
      label: 'Country',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },
  ],

  // trusted contact person
  [
    {
      id: 'identity_trusted_contact_person_trusted_contact_checkbox',
      field: 'checkbox',
      label: `Trusted contact`,
    },

    {
      field: 'input',
      label: 'First name',
      id: 'identity_trusted_contact_person_first_name',
      type: 'text',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Last name',
      id: 'identity_trusted_contact_person_last_name',
      type: 'text',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Email',
      id: 'identity_trusted_contact_person_email',
      type: 'email',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Contact phone no.',
      id: 'identity_trusted_contact_person_phone',
      type: 'text',
      placeholder: '',
    },
    {
      field: 'input',
      label: 'Relationship',
      id: 'identity_trusted_contact_person_relationship',
      type: 'text',
      placeholder: '',
    },
  ],

  // regulatory questions
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
      label: `I am a director, policy maker, or a senior officer of 
      a publicly traded company.`,
      id: 'identity_checkbox_2',
    },
    {
      field: 'checkbox',
      label: `I am a 10% shareholder of a publicly traded company.`,
      id: 'identity_checkbox_3',
    },
    {
      field: 'checkbox',
      label: `I am a senior military, governmental or political official
      in a non-US country.`,
      id: 'identity_checkbox_4',
    },
    {
      field: 'checkbox',
      label: `I have been notified by the IRS that I am subject to 
      backup withholding.`,
      id: 'identity_checkbox_5',
    },
  ],
];