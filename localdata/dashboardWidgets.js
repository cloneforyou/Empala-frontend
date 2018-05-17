import { uniqueId } from 'lodash';

export const widgets = [
  {
    id: uniqueId(),
    title: 'Financial capital',
    col: 4,
    tables: [
      {
        id: uniqueId(),
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
            align: 'center',
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
            value: '9,999,999,999',
            dayChg: '999.9',
            allocation: 'EMARA & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: '999.9',
            allocation: 'Currencies & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: '999.9',
            allocation: 'Currencies & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
        ],
      },
      {
        id: uniqueId(),
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
        data: [
          {
            id: uniqueId(),
            STperformance: '1 Week',
            change1: '000.0',
            indexes: '000.0',
            LTperformance: '1 Year',
            change2: '9,999.9',
            indexe2: '9,999.9',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Social capital',
    col: 3,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Network',
            align: 'left',
          },
          {
            title: 'No.',
            align: 'left',
          },
          {
            title: 'Positioning',
            align: 'left',
          },
          {
            title: '%ile',
            align: 'left',
          },
        ],
        data: [
          {
            id: uniqueId(),
            test: 'Connections',
            no: '999,999',
            positioning: '1M return',
            ile: '99',
          },
          {
            id: uniqueId(),
            test: 'Connections',
            no: '999,999',
            positioning: '1M return',
            ile: '99',
          },
          {
            id: uniqueId(),
            test: 'Connections',
            no: '999,999',
            positioning: '1M return',
            ile: '99',
          },
        ],
      },
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Get',
            align: 'left',
          },
          {
            title: 'No.',
            align: 'left',
          },
          {
            title: 'Give',
            align: 'left',
          },
          {
            title: 'No.',
            align: 'left',
          },
        ],
        data: [
          {
            id: uniqueId(),
            test: 'Ratings received',
            no: '999,999',
            positioning: 'Ratings given',
            no1: '999,999',
          },
          {
            id: uniqueId(),
            test: 'Ratings received',
            no: '999,999',
            positioning: 'Ratings given',
            no1: '999,999',
          },
          {
            id: uniqueId(),
            test: 'Connections',
            no: '999,999',
            positioning: '1M return',
            no1: '99',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Financial capital',
    col: 5,
    tables: [
      {
        id: uniqueId(),
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
            align: 'center',
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
            value: '9,999,999,999',
            dayChg: '999.9',
            allocation: 'EMARA & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: '999.9',
            allocation: 'Currencies & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: '999.9',
            allocation: 'Currencies & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
        ],
      },
      {
        id: uniqueId(),
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
        data: [
          {
            id: uniqueId(),
            STperformance: '1 Week',
            change1: '000.0',
            indexes: '000.0',
            LTperformance: '1 Year',
            change2: '9,999.9',
            indexe2: '9,999.9',
          },
        ],
      },
    ],
  },

];

