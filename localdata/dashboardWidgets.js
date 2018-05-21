import { uniqueId } from 'lodash';

export const widgets = [
  {
    id: uniqueId(),
    title: 'Financial capital',
    icon: 'community',
    col: 4,
    height: 390,
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
    icon: 'groups',
    col: 3,
    height: 390,
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
    title: 'Environmental capital',
    icon: 'environmental',
    col: 5,
    height: 390,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Size & growth',
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
            size: 'Community assets',
            no: '9,999,999,999',
          },
          {
            id: uniqueId(),
            size: 'Community assets',
            no: '9,999,999,999',
          },
          {
            id: uniqueId(),
            size: 'Community assets',
            no: '9,999,999,999',
          },
          {
            id: uniqueId(),
            size: 'Community assets',
            no: '9,999,999,999',
          },
          {
            id: uniqueId(),
            size: 'Community assets',
            no: '9,999,999,999',
          },
        ],
      },
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Opinions',
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
            opinion: 'Votes completed',
            no: '999,999',
          },
          {
            id: uniqueId(),
            opinion: 'Votes completed',
            no: '999,999',
          },
          {
            id: uniqueId(),
            opinion: 'Votes completed',
            no: '999,999',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Active orders',
    col: 4,
    height: 287,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Security & symbol',
            align: 'left',
          },
          {
            title: 'Price',
            align: 'right',
          },
          {
            title: 'Qty',
            align: 'right',
          },
          {
            title: 'Notional',
            align: 'right',
          },
          {
            title: 'Diff %',
            align: 'left',
          },
        ],
        data: [
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
          {
            id: uniqueId(),
            security: 'xxxxxxxxxxxxxx - xxx',
            price: '9,999,999,999',
            qty: '999,999,99.99',
            notional: '999,999,99.99',
            diff: '9.99',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Working deals',
    col: 3,
    height: 287,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Description',
            align: 'left',
          },
          {
            title: 'Amount',
            align: 'right',
          },
          {
            title: 'Clearing price',
            align: 'left',
          },
          {
            title: 'Diff %',
            align: 'left',
          },
          {
            title: 'Status',
            align: 'left',
          },

        ],
        data: [
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Active',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Active',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Action',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          }, {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxx xxxxxx',
            Amount: '9,999,999,999',
            clearingPrice: '999,999,99.99',
            diff: '99.9',
            status: 'Close',
          },

        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Deal development',
    col: 5,
    height: 287,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Description',
            align: 'left',
          },
          {
            title: 'Date',
            align: 'left',
          },
          {
            title: 'Update type',
            align: 'left',
          },
          {
            title: 'Diff %',
            align: 'left',
          },
        ],
        data: [
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxxxxxxxxxxxx xxxxxx',
            date: '02-27-2018',
            updateType: 'xxxxxx-xxxxxxx',
            diff: '99.9',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxxxxxxxxxxxx xxxxxx',
            date: '02-27-2018',
            updateType: 'xxxxxx-xxxxxxx',
            diff: '99.9',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxxxxxxxxxxxx xxxxxx',
            date: '02-27-2018',
            updateType: 'xxxxxx-xxxxxxx',
            diff: '99.9',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxxxxxxxxxxxx xxxxxx',
            date: '02-27-2018',
            updateType: 'xxxxxx-xxxxxxx',
            diff: '99.9',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxxxxxxxxxxxx xxxxxx',
            date: '02-27-2018',
            updateType: 'xxxxxx-xxxxxxx',
            diff: '99.9',
          },
          {
            id: uniqueId(),
            description: 'xxxxxxxxxxxxxxxxxxxxxxxx xxxxxx',
            date: '02-27-2018',
            updateType: 'xxxxxx-xxxxxxx',
            diff: '99.9',
          },
        ],
      },
    ],
  },
];
export const widgetNews = [
  {
    id: uniqueId(),
    title: 'News',
    type: 'All',
    col: 4,
    height: 365,
    news: [
      {
        id: uniqueId(),
        creator: 'BBC News',
        date: new Date(),
        title: 'UK is ‘sleepwalking into a Brexit security crisis’, warn MPs',
        rating: 4,
        image: 'news-image.svg',
      },
      {
        id: uniqueId(),
        creator: 'BBC News',
        date: new Date(2018, 13, 1),
        title: 'UK is ‘sleepwalking into a Brexit security crisis’, warn MPs',
        rating: 4,
        image: 'news-image.svg',
      },
      {
        id: uniqueId(),
        creator: 'BBC News',
        date: new Date(2014, 13, 1),
        title: 'UK is ‘sleepwalking into a Brexit security crisis’, warn MPs',
        rating: 4,
        image: 'news-image.svg',
      },
      {
        id: uniqueId(),
        creator: 'BBC News',
        date: new Date(2013, 13, 1),
        title: 'UK is ‘sleepwalking into a Brexit security crisis’, warn MPs',
        rating: 4,
        image: 'news-image.svg',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Empala internal news',
    type: 'Empala',
    col: 3,
    height: 365,
    news: [
      {
        id: uniqueId(),
        date: new Date(),
        title: 'UK is ‘sleepwalking into a Brexit security crisis’, warn MPs',
        rating: 4,
        image: 'news-image2.svg',
      },
      {
        id: uniqueId(),
        date: new Date(),
        title: 'UK is ‘sleepwalking into a Brexit security crisis’, warn MPs',
        rating: 4,
        image: 'news-image2.svg',
      },
      {
        id: uniqueId(),
        date: new Date(),
        title: 'UK is ‘sleepwalking into a Brexit security crisis’, warn MPs',
        rating: 4,
        image: 'news-image2.svg',
      },
    ],
  },
];

