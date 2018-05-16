import { uniqueId } from 'lodash';

export const widgetFinancialCapital = {
  title: 'Financial capital',
  tables: [
    {
      headers: [
        {
          title: 'Exposure',
          align: 'left',
        },
        {
          title: 'Value',
          align: 'right',
        },
        {
          title: 'Day chg',
          align: 'right',
        },
        {
          title: 'Allocation',
          align: 'left',
        },
        {
          title: 'Domestic',
          align: 'left',
        },
        {
          title: 'Foreign',
          align: 'left',
        },
      ],
      data: [
        {
          id: uniqueId(),
          exposure: 'Total a / c value',
          value: '9, 999, 999, 999',
          dayChg: '999.9',
          allocation: 'EMARA & MM',
          domestic: '9, 999, 999, 999',
          foreign: '9, 999, 999, 999',
        },
        {
          id: uniqueId(),
          exposure: 'Total a / c value',
          value: '9, 999, 999, 999',
          dayChg: '999.9',
          allocation: 'EMARA & MM',
          domestic: '9, 999, 999, 999',
          foreign: '9, 999, 999, 999',
        },
      ],
    },
    {
      headers: [
        {
          title: 'ST performance',
          align: 'left',
        },
        {
          title: '% change',
          align: 'center',
        },
        {
          title: 'Vs indexes',
          align: 'center',
        },
        {
          title: 'LT Performance',
          align: 'left',
        },
        {
          title: '% change',
          align: 'center',
        },
        {
          title: 'Vs indexes',
          align: 'center',
        },
      ],
    },
  ],

};