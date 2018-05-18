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

export const dataFields = [
  [
    {
      id: 'investment_experience_equities',
      label: 'Equities',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_cryptocurrencies',
      label: 'Cryptocurrencies',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_options',
      label: 'Options',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_private_equity',
      label: 'Private equity',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_bonds',
      label: 'Bonds',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_margin_accounts',
      label: 'Margin accounts',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_margin_currencies',
      label: 'Currencies',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_borrowing_money',
      label: 'Borrowing money',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_futures',
      label: 'Futures',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_lending_money',
      label: 'Lending money',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_foreign_markets',
      label: 'Foreign markets',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
    {
      id: 'investment_experience_exotics',
      label: 'Exotics',
      col: '6',
      options,
      hint: 'Please select',
      autoWidth: true,
    },
  ],
];

export { dataFields as default };
