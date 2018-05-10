export const dataFields = [
  // residential address
  [
    {
      id: 'identity_residential_address_residential_address_line_1',
      label: 'Residential address line 1',
      type: 'text',
      placeholder: '',
    },

    {
      id: 'identity_residential_address_residential_address_line_2',
      label: 'Residential address line 2',
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
      id: 'identity_residential_address_residential_address_state',
      hint: 'Please select',
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
      label: 'Country',
      options: [
        {
          value: 'United States',
          title: 'United States'
        },
      ],
    },
  ],

  // mailing address
  [
    {
      id: 'identity_mailing_address_residential_address_line_1',
      label: 'Mailing address line 1',
      type: 'text',
      placeholder: '',
    },

    {
      id: 'identity_mailing_address_residential_address_line_2',
      label: 'Mailing address line 2',
      type: 'text',
      placeholder: '',
    },

    {
      id: 'identity_mailing_address_zip_code',
      label: 'Zip code',
      type: 'number',
      placeholder: '',
    },

    {
      id: 'identity_mailing_address_state',
      hint: 'Please select',
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
  ],

  // regulatory questions
  [

  ],
];