import { uniqueId } from 'lodash';
import Performance from '../components/dashboard/Pages/Performance';

export const widgetsOverflow = [
  {
    id: uniqueId(),
    title: 'Financial capital',
    icon: 'community',
    col: 5,
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
          },
          {
            title: 'Allocation',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: { data: 999.9, position: 'up' },
            allocation: 'EMARA & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: { data: 999.9, position: 'down' },
            allocation: 'Currencies & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: { data: 999.9, position: 'up' },
            allocation: 'EMARA & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: { data: 999.9, position: 'up' },
            allocation: 'EMARA & MM',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
          },
          {
            id: uniqueId(),
            exposure: 'Total a / c value',
            value: '9,999,999,999',
            dayChg: { data: 999.9, position: 'down' },
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
            align: 'right',
          },
          {
            title: 'Vs indexes',
            align: 'right',
          },
          {
            title: 'LT Performance',
            align: 'left',
          },
          {
            title: '% change',
            align: 'right',
          },
          {
            title: 'Vs indexes',
            align: 'right',
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
            width: '30%',
          },
          {
            title: 'No.',
            align: 'right',
            width: '20%',
          },
          {
            title: 'Positioning',
            align: 'left',
            width: '30%',
          },
          {
            title: '%ile',
            align: 'left',
            width: '20%',
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
            width: '30%',
          },
          {
            title: 'No.',
            align: 'right',
            width: '20%',
          },
          {
            title: 'Give',
            align: 'left',
            width: '30%',
          },
          {
            title: 'No.',
            align: 'left',
            width: '20%',
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
    col: 4,
    height: 390,
    tables: [
      {
        id: uniqueId(),
        group: 1,
        headers: [
          {
            title: 'Size & growth',
            align: 'left',
            width: '120px',
          },
          {
            title: 'No.',
            align: 'right',
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
        group: 1,
        headers: [
          {
            title: 'Opinions',
            align: 'left',
            width: '120px',
          },
          {
            title: 'No.',
            align: 'right',
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
      {
        id: uniqueId(),
        group: 2,
        headers: [
          {
            title: 'Sentiments',
            align: 'left',
          },
          {
            title: '',
            align: 'left',
          },
        ],
        data: [
          {
            id: uniqueId(),
            sentiments: 'Equities',
            chart: 'sentim-chart1.svg',
          },
          {
            id: uniqueId(),
            sentiments: 'Equities',
            chart: 'sentim-chart2.svg',
          },
          {
            id: uniqueId(),
            sentiments: 'Equities',
            chart: 'sentim-chart1.svg',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Active orders',
    col: 5,
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
    col: 4,
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
            align: 'right',
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

export const widgetsPositionFirst = [
  {
    id: uniqueId(),
    title: 'Position',
    col: 12,
    height: 'auto',
    tables: [
      {
        id: uniqueId(),
        title: 'notional',
        headers: [
          {
            title: 'Notional amount',
            width: '165px',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
          {
            title: 'Total',
            align: 'right',
          },
          {
            title: 'Day change',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            total: '9,999,999,999',
            foreign: '9,999,999,999',
            dayChange: 999.9,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'percent',
        headers: [
          {
            title: 'Percentage allocations',
            width: '165px',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
          {
            title: 'Total',
            align: 'right',
          },
          {
            title: 'Day change',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'adjusted',
        headers: [
          {
            title: 'Adjusted amounts',
            width: '165px',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
          {
            title: 'Total',
            align: 'right',
          },
          {
            title: 'Day change',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'riskMeasures',
        headers: [
          {
            title: 'Position risk measures',
            width: '165px',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
          {
            title: 'Total',
            align: 'right',
          },
          {
            title: 'Day change',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'riskTheoreticals',
        headers: [
          {
            title: 'Risk theoreticals',
            width: '165px',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
          {
            title: 'Total',
            align: 'right',
          },
          {
            title: 'Day change',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'fundingAnalysis',
        headers: [
          {
            title: 'Funding analysis',
            width: '165px',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
          {
            title: 'Total',
            align: 'right',
          },
          {
            title: 'Day change',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'creditAnalysis',
        headers: [
          {
            title: 'Credit analysis',
            width: '165px',
          },
          {
            title: 'Domestic',
            align: 'right',
          },
          {
            title: 'Foreign',
            align: 'right',
          },
          {
            title: 'Total',
            align: 'right',
          },
          {
            title: 'Day change',
            align: 'right',
          },
        ],
        data: [
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
          {
            id: uniqueId(),
            exposure: 'Net value',
            domestic: '9,999,999,999',
            foreign: '9,999,999,999',
            total: '9,999,999,999',
            dayChange: 999.9,
          },
        ],
      },
    ],
  },
];
export const widgetsPositions = [
  {
    id: uniqueId(),
    title: 'Position portfolio',
    col: 12,
    height: 'auto',
    localFX: true,
    dots: true,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Start date',
            width: '80px',
            sort: true,
          },
          {
            title: 'Symbol',
            width: '60px',
            sort: true,
          },
          {
            title: 'Sec name',
            width: '140px',
          },
          {
            title: 'Sec ID',
            align: 'right',
            sort: true,
          },
          {
            title: 'Category',
            width: '100px',
          },
          {
            title: 'Country',
            sort: true,
          },
          {
            title: 'Curr',
            sort: true,
          },
          {
            title: 'Ann CF%',
          },
          {
            title: 'Carry',
          },
          {
            title: 'Ann Ret',
            sort: true,
          },
          {
            title: 'VAR Count',
          },
          {
            title: 'Avg Price',
          },
          {
            title: 'Quantity',
          },
          {
            title: 'M2M',
          },
          {
            title: 'Notional',
          },
          {
            title: 'Tot % Chg',
          },
          {
            title: 'Tot P&L',
          },
          {
            title: 'Day % Chg',
          },
          {
            title: 'Day P&L',
          },
        ],
        data: [
          {
            id: uniqueId(),
            date: '07-05-2018',
            symbol: '999999',
            secName: 'xxxxxxxxxxxx',
            sec: '999999999',
            category: 'xxxxxxxxxx',
            country: '9,99',
            curr: '999',
            annCf: '9,99',
            carry: '9,999',
            annRet: '9,9',
            varCount: '99,999,999',
            avgPrice: '99,999,9',
            quantity: '99,999,999',
            m2m: '99,999,999',
            notional: '99,999,999',
            totChg: '99,999,999',
            totPL: '99,999,999',
            dayChgN: '99,999,999',
            dayPL: '99,999,999',
          },
          {
            id: uniqueId(),
            date: '07-05-2018',
            symbol: '999999',
            secName: 'xxxxxxxxxxxx',
            sec: '999999999',
            category: 'xxxxxxxxxx',
            country: '9,99',
            curr: '999',
            annCf: '9,99',
            carry: '9,999',
            annRet: '9,9',
            varCount: '99,999,999',
            avgPrice: '99,999,9',
            quantity: '99,999,999',
            m2m: '99,999,999',
            notional: '99,999,999',
            totChg: '99,999,999',
            totPL: '99,999,999',
            dayChgN: '99,999,999',
            dayPL: '99,999,999',
          },
          {
            id: uniqueId(),
            date: '07-05-2018',
            symbol: '999999',
            secName: 'xxxxxxxxxxxx',
            sec: '999999999',
            category: 'xxxxxxxxxx',
            country: '9,99',
            curr: '999',
            annCf: '9,99',
            carry: '9,999',
            annRet: '9,9',
            varCount: '99,999,999',
            avgPrice: '99,999,9',
            quantity: '99,999,999',
            m2m: '99,999,999',
            notional: '99,999,999',
            totChg: '99,999,999',
            totPL: '99,999,999',
            dayChgN: '99,999,999',
            dayPL: '99,999,999',
          },
        ],
      },
    ],
  },
];

export const widgetsPerformance = [
  {
    id: uniqueId(),
    title: 'Performance analysis',
    col: 2,
    height: 439,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Period',
          },
          {
            title: '%CH',
          },
          {
            title: 'Vs ind.',
          },
          {
            title: '%ile',
          },

        ],
        data: [
          {
            id: uniqueId(),
            period: 'Today',
            ch: '999,9',
            vsInd: '99,9',
            ile: '99',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Performance analysis by filters',
    col: 5,
    height: 439,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'By',
          },
          {
            title: 'Lower',
          },
          {
            title: 'Upper',
          },
          {
            title: '%CH',
          },
          {
            title: 'P&L',
          },
          {
            title: 'Ann RARR',
          },
        ],
        data: [
          {
            id: uniqueId(),
            by: 'Trade #',
            low: '999999',
            up: '99999999',
            ch: '999',
            pl: '99,999,9',
            ann: '9,99',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Community league',
    col: 5,
    height: 439,
    assetAmountRange: true,
    switcher: {
      labels: ['Empala network', 'Your network'],
    },
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'By',
          },
          {
            title: 'Lower',
          },
          {
            title: 'Upper',
          },
          {
            title: '%CH',
          },
          {
            title: 'P&L',
          },
          {
            title: 'Ann RARR',
          },
        ],
        data: [
          {
            id: uniqueId(),
            by: 'Trade #',
            low: '999999',
            up: '99999999',
            ch: '999',
            pl: '99,999,9',
            ann: '9,99',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Performance analysis by filters',
    col: 12,
    height: 589,
    assetAmountRange: true,
    localFX: true,
    dots: true,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Trade #',
          },
          {
            title: 'Start date',
          },
          {
            title: 'End date',
          },
          {
            title: 'Symbol',
          },
          {
            title: 'Sec name',
          },
          {
            title: 'Sec ID',
          },
          {
            title: 'Category',
          },
          {
            title: 'Currency',
          },
          {
            title: 'Avg price',
          },
          {
            title: 'Qty',
          },
          {
            title: 'Close/M2M',
          },
          {
            title: 'Notional',
          },
          {
            title: '%CH',
          },
          {
            title: 'Carry',
          },
          {
            title: 'Val CH',
          },
          {
            title: 'Tot P&L',
          },
          {
            title: 'Ann Ret',
          },
        ],
        data: [],
      },
    ],
  },
];

export const widgetsCash = [
  {
    id: uniqueId(),
    title: 'Currency and money markets fund balance',
    col: 12,
    height: 'auto',
    localFX: true,
    dots: true,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Date',
          },
          {
            title: 'Symbol',
          },
          {
            title: 'Sec name',
          },
          {
            title: 'Sec ID',
          },
          {
            title: 'Qty',
          },
          {
            title: 'Avg price',
          },
          {
            title: 'Exec fees',
          },
          {
            title: 'Reg fees',
          },
          {
            title: 'Notional',
          },
          {
            title: 'Curr',
          },
          {
            title: 'Curr. effect',
          },
          {
            title: 'EMARA balance',
          },
          {
            title: 'USD balance',
          },
          {
            title: 'GBP balance',
          },
          {
            title: 'EUR balance',
          },
          {
            title: 'Trade conf. link',
          },
          {
            title: 'Comments',
          },
        ],
        data: [],
      },
    ],
  },
];


export const widgetsOrders = [
  {
    id: uniqueId(),
    title: 'Orders',
    col: 12,
    height: 224,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Sec name',
            width: '400px',
          },
          {
            title: 'Symbol',
            sort: true,
          },
          // {
          //   title: 'Date',
          // },
          {
            title: 'Curr',
          },
          {
            title: 'Price',
            sort: true,
          },
          {
            title: 'Order Q',
          },
          {
            title: 'Fill Q',
          },
          {
            title: 'Rem Q',
          },
          {
            title: 'Notional',
          },
          {
            title: 'Commision',
          },
          {
            title: 'Distance (%)',
          },
          {
            title: 'Start date',
          },
          {
            title: 'O/C/T',
          },
        ],
        data: [],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Fills/cancels',
    col: 12,
    height: 221,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Sec name',
            width: '400px',
          },
          {
            title: 'Symbol',
            sort: true,
          },
          // {
          //   title: 'Date',
          // },
          {
            title: 'Curr',
          },
          {
            title: 'Price',
            sort: true,
          },
          {
            title: 'Order Q',
          },
          {
            title: 'Fill Q',
          },
          {
            title: 'Rem Q',
          },
          {
            title: 'Notional',
          },
          {
            title: 'Commision',
          },
          {
            title: 'Distance (%)',
          },
          {
            title: 'Start date',
          },
          {
            title: 'O/C/T',
          },
        ],
        data: [],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Watchlists',
    col: 12,
    height: 568,
    dots: true,
    tables: [
      {
        id: uniqueId(),
        headers: [
          {
            title: 'Sec name',
            width: '400px',
          },
          {
            title: 'Symbol',
            sort: true,
          },
          // {
          //   title: 'Date',
          // },
          {
            title: 'Curr',
          },
          {
            title: 'Last',
          },
          {
            title: 'Bid SZ',
          },
          {
            title: 'Bid',
          },
          {
            title: 'Offer',
          },
          {
            title: 'Off SZ',
          },
          {
            title: 'Day volume',
          },
          {
            title: 'Sentiment',
          },
          {
            title: 'ES CH',
          },
          {
            title: 'P/E ratio',
          },
          {
            title: 'Sec ID',
          },
          {
            title: 'Rating',
          },
        ],
        data: [],
      },
    ],
  },
];
