import moment from 'moment';
import { uniqueId } from 'lodash';

const widgetAttributes = {
  overview_social_capital: {
    id: 'overview_social_capital',
    title: 'Social capital',
    icon: 'groups',
    col: 3,
    height: 390,
    padding_left: 5,
    padding_right: 35,
  },
  overview_financial_capital_exposure: {
    id: 'overview_financial_capital_exposure',
    title: 'Financial capital',
    icon: 'community',
    col: 5,
    height: 390,
    padding_left: 15,
    padding_right: 15,
  },
  overview_environmental_capital: {
    id: 'overview_environmental_capital',
    title: 'Environmental capital',
    icon: 'environmental',
    col: 4,
    height: 390,
    padding_left: 15,
    padding_right: 15,
  },
  active_orders: {
    id: 'active_orders',
    title: 'Active orders',
    col: 5,
    height: 290,
    padding_left: 15,
    padding_right: 15,
  },
  overview_working_deals: {
    id: 'overview_working_deals',
    title: 'Working deals',
    col: 3,
    height: 290,
    padding_left: 5,
    padding_right: 14,
  },
  overview_deals_development: {
    id: 'overview_deals_development',
    title: 'Deal developments',
    col: 3,
    height: 290,
    padding_left: 15,
    padding_right: 14,
  },
  dashboard_orders: {
    id: 'dashboard_orders',
    title: 'Orders',
    col: 12,
    height: 224,
    dots: true,
  },
  dashboard_fills: {
    id: 'dashboard_fills',
    title: 'Fills/cancels',
    col: 12,
    height: 222,
    dots: true,
  },
  dashboard_community_league: {
    id: 'dashboard_community_league',
    title: 'Community league',
    col: 5,
    col_md: 12,
    height: 439,
    assetAmountRange: true,
    info: true,
    switcher: {
      labels: ['Empala network', 'Your network'],
    },
  },
};
const tableHeaders = {
  dashboard_cash: {
    id: 'dashboard_cash',
    title: 'Currency and money markets fund balance',
    col: 12,
    height: 'auto',
    localFX: true,
    dots: true,
    headers: [
      'Date',
      'Symbol',
      'Sec name',
      'Sec ID',
      'Qty',
      'Avg price',
      'Exec fees',
      'Reg fees',
      'Notional',
      'Curr',
      'Curr. effect',
      'EMARA balance',
      'USD balance',
      'GBP balance',
      'EUR balance',
      'Trade conf. link',
      'Comments',
    ],
    attrs: {
      align: [
        'left',
        'left',
        'left',
        'left',
        'right',
        'right',
        'left',
        'left',
        'right',
        'left',
        'right',
        'left',
        'left',
        'left',
        'left',
        'center',
        'center',
      ],
      width: [
        '93px',
        '60px',
        '138px',
        '118px',
        '90px',
        '90px',
        '102px',
        '88px',
        '108px',
        '45px',
        '106px',
        '126px',
        '124px',
        '128px',
        '114px',
        '110px',
        '78px',
      ],
    },
  },
  dashboard_watchlist: {
    id: 'dashboard_watchlist',
    title: 'Watchlists',
    col: 12,
    height: 488,
    dots: true,
    headers: [
      'Sec name',
      'Symbol',
      'Curr',
      'Last P',
      'Bid SZ',
      'Bid',
      'Offer',
      'Off SZ',
      'Day volume',
      'Sentiment',
      'ES CH',
      'P/E ratio',
      'Sec ID',
      'Rating',
    ],
    attrs: {
      align: [
        'left',
        'left',
        'center',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'center',
        'center',
        'center',
        'right',
        'center',
      ],
      width: [
        '210px',
        '107px',
        '75px',
        '138px',
        '114px',
        '114px',
        '110px',
        '110px',
        '125px',
        '110px',
        '88px',
        '88px',
        '145px',
        '190px',
      ],
      sortable: [
        false,
        true,
      ],
    },
  },
  dashboard_orders: {
    id: 'dashboard_orders',
    title: 'Orders',
    height: 164,
    dots: true,
    headers: [
      'Sec name',
      'Symbol',
      'Curr',
      'Price',
      'Order Q',
      'Fill Q',
      'Rem Q',
      'Notional',
      'Commission',
      'Distance (%)',
      'Start date',
      'O/C/T',
    ],
    attrs: {
      align: [
        'left',
        'left',
        'left',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'center',
        'center',
      ],
      width: [
        '230px',
        '125px',
        '86px',
        '138px',
        '150px',
        '150px',
        '135px',
        '130px',
        '125px',
        '120px',
        '130px',
        '200px',
      ],
      sortable: [
        false,
        true,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
      ],
    },
  },
  dashboard_fills: {
    id: 'dashboard_fills',
    title: 'Fills/cancels',
    height: 162,
    dots: true,
    headers: [
      'Sec name',
      'Symbol',
      'Curr',
      'Price',
      'Order Q',
      'Fill Q',
      'Notional',
      'Exec fees',
      'Reg fees',
      '$ proceeds',
      'Start date',
      'O/C/T',
    ],
    attrs: {
      align: [
        'left',
        'left',
        'left',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'center',
        'center',
      ],
      width: [
        '230px',
        '125px',
        '86px',
        '138px',
        '150px',
        '150px',
        '135px',
        '130px',
        '125px',
        '120px',
        '130px',
        '200px',
      ],
      sortable: [
        false,
        true,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
      ],
    },
  },
  dashboard_positions_portfolio: {
    id: 'dashboard_positions_portfolio',
    title: 'Position portfolio',
    col: 12,
    dots: true,
    localFX: true,
    headers: [
      'Start date',
      'Symbol',
      'Sec name',
      'Sec ID',
      'Category',
      'Country',
      'Curr',
      'Ann CF%',
      'Carry',
      'Ann Ret',
      'VAR Cont',
      'Avg Price',
      'Quantity',
      'M2M',
      'Notional',
      'Tot % Chg',
      'Tot P&L',
      'Day % Chg',
      'Day P&L',
    ],
    attrs: {
      width: [
        '98px',
        '65px',
        '125px',
        '70px',
        '90px',
        '65px',
        '48px',
        '65px',
        '45px',
        '65px',
        '80px',
        '78px',
        '62px',
        '80px',
        '80px',
        '80px',
        '80px',
        '80px',
        '75px',
      ],
      align: [
        'left',
        'left',
        'left',
        'right',
        'left',
        'left',
        'left',
        'left',
        'left',
        'left',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
      ],
      sortable: [
        true,
        true,
        false,
        true,
        false,
        true,
        true,
        false,
        false,
        true,
      ],
    },
  },
  overview_financial_capital_exposure: {
    id: 'overview_financial_capital_exposure',
    height: 200,
    headers: [
      'Exposure',
      'Value',
      'D % ch',
    ],
    attrs: {
      align: [
        'left',
        'right',
        'left',
      ],
      width: [
        '125px',
        '95px',
        '50px',
      ],
      sortable: [
      ],
    },
  },
  overview_financial_capital_allocation: {
    id: 'overview_financial_capital_allocation',
    height: 200,
    headers: [
      'Allocation',
      'Domestic',
      'Foreign',
    ],
    attrs: {
      align: [
        'left',
        'right',
        'right',
      ],
      width: [
        '120px',
        '105px',
        '85px',
      ],
      sortable: [
      ],
    },
  },
  overview_financial_capital_performance_st: {
    id: 'overview_financial_capital_performance_st',
    title: 'Financial capital performance',
    col: 5,
    padding_left: 10,
    headers: [
      'ST performance',
      '% change',
      'Vs indexes',
    ],
    attrs: {
      align: [
        'left',
        'right',
        'right',
      ],
      width: [
        '115px',
        '75px',
        '80px',
      ],
      sortable: [
      ],
    },
  },
  overview_financial_capital_performance_lt: {
    id: 'overview_financial_capital_performance_lt',
    title: 'Financial capital performance',
    col: 5,
    headers: [
      'LT Performance',
      '% change',
      'Vs indexes',
    ],
    attrs: {
      align: [
        'left',
        'right',
        'right',
      ],
      width: [
        '120px',
        '105px',
        '85px',
      ],
      sortable: [
      ],
    },
  },
  overview_social_capital_network: {
    id: 'overview_social_capital_network',
    title: 'Social capital',
    height: 200,
    headers: [
      'Network',
      'No.',
    ],
    attrs: {
      align: [
        'left',
        'right',
      ],
      width: [
        '185px',
        '75px',
      ],
      sortable: [
      ],
    },
  },
  overview_social_capital_positioning: {
    id: 'overview_social_capital_positioning',
    height: 200,
    headers: [
      'Positioning',
      '%ile',
    ],
    attrs: {
      align: [
        'left',
        'right',
      ],
      width: [
        '130px',
        '45px',
      ],
      sortable: [
      ],
    },
  },
  overview_social_capital_get: {
    id: 'overview_social_capital_get',
    headers: [
      'Get',
      'No.',
    ],
    attrs: {
      align: [
        'left',
        'right',
      ],
      width: [
        '185px',
        '75px',
      ],
      sortable: [
      ],
    },
  },
  overview_social_capital_give: {
    id: 'overview_social_capital_give',
    headers: [
      'Give',
      'No.',
    ],
    attrs: {
      align: [
        'left',
        'right',
      ],
      width: [
        '130px',
        '45px',
      ],
      sortable: [
      ],
    },
  },
  overview_environmental_capital_size_growth: {
    id: 'overview_environmental_capital_size_growth',
    height: 200,
    headers: [
      'Size & growth',
      'No.',
    ],
    attrs: {
      align: [
        'left',
        'right',
      ],
      width: [
        '180px',
        '90px',
      ],
      sortable: [
      ],
    },
  },
  overview_environmental_capital_opinions: {
    id: 'overview_environmental_capital_opinions',
    headers: [
      'Opinions',
      'No.',
    ],
    attrs: {
      align: [
        'left',
        'right',
      ],
      width: [
        '180px',
        '90px',
      ],
      sortable: [
      ],
    },
  },
  active_orders: {
    id: 'active_orders',
    title: 'Active orders',
    height: 220,
    dots: true,
    headers: [
      'Security & symbol',
      'Price',
      'Qty',
      'Notional',
      'Diff %',
    ],
    attrs: {
      align: [
        'left',
        'right',
        'right',
        'right',
        'right',
      ],
      width: [
        '230px',
        '115px',
        '75px',
        '95px',
        '74px',
      ],
      sortable: [
        true,
      ],
    },
  },
  overview_working_deals: {
    id: 'overview_working_deals',
    title: 'Working deals',
    height: 220,
    dots: true,
    headers: [
      'Description',
      'Amount',
      'Clearing price',
      'Diff %',
      'Status',
    ],
    attrs: {
      align: [
        'left',
        'right',
        'right',
        'right',
        'left',
      ],
      width: [
        '185px',
        '75px',
        '90px',
        '55px',
        '60px',
      ],
      sortable: [
      ],
    },
  },
  overview_deals_development: {
    id: 'overview_deals_development',
    title: 'Deals development',
    height: 220,
    headers: [
      'Description',
      'Date',
      'Update type',
      'Diff %',
    ],
    attrs: {
      align: [
        'left',
        'center',
        'left',
        'right',
      ],
      width: [
        '210px',
        '135px',
        '130px',
        '77px',
      ],
      padding: [
        null,
        null,
        null,
        '0 30px 0 0',
      ],
      sortable: [
      ],
    },
  },
  dashboard_community_league: {
    id: 'dashboard_community_league',
    title: 'Community league',
    height: 336,
    dots: true,
    headers: [
      'Rank',
      'Name',
      'Ann % R',
      'Total % R',
      'Total $ Ret',
      'Total $ Val',
      '1YR % R',
      '3M % R',
      '1M % R',
    ],
    attrs: {
      align: [...Array(2).fill('left'), ...Array(7).fill('right')],
      width: [
        '7%',
        '21%',
        '9%',
        '9%',
        '12%',
        '15%',
        '9%',
        '9%',
        '9%',
      ],
      sortable: Array(9).fill(true),
      // callbacks: Array(9).fill((e, name, index) => console.log(e, name, index)),
    },
  },
};

export const getFormattedNumber = number => number.toString().replace(/[^0-9]/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
export const formatNumberWithFixedPoint = (number, n) => {
  if (Number.isNaN(Number(number)) || Number(number) === 0) return number;
  if (!n || n === 0) return getFormattedNumber(Math.round(number));
  const vals = Number(number).toFixed(n).split('.');
  return number > 0 ? [getFormattedNumber(vals[0]), vals[1]].join('.') : `-${[getFormattedNumber(vals[0]), vals[1]].join('.')}`;
};

/* ========= parses the date from specified string ======== */
/* ========= like '/Date(1530076567409+0000)/' ==========  */
export const parseOrderDate = str => new Date(parseInt(str.match(/\d+(\+\d+)?/)[0], 10)).toLocaleString();
export const parseDateString = (str, pattern) => {
  if (!pattern) return moment(str).format('DD-MM-YYYY');
  return moment(str).format(pattern);
};

// const getPositionsPLs = (positions) => {
//   if (!positions) return false;
//   const out = {};
//   positions.length>0 && positions.forEach((pos) => {
//     out[pos.sec_id] = pos.rpl;
//     return true;
//   });
//   return out;
// };
// const calculateDayRPL = pos => pos && pos[2] ? pos[16] : false;
// const calculateMarketValue = pos => getPositionMark(pos);
// const getPositionMark = pos => {
//   switch (pos.SecurityType) {
//     case 'CommonStock':
//       return 0;
//
//   }
// }
// const calculateDayPL = pos => calculateMarketValue(pos) - calculatePrevMarketValue(pos) + calculateDayRPL(pos);

// TODO maybe will need some correction when watchlist appears
export const calculateOrderDistance = (price, lastPrice) =>
  Math.abs(Math.round(((price - lastPrice) * 100) / price));

export const calculateOrderPrice = (symbolPrice, quantity) =>
  (Math.round(parseFloat(symbolPrice) * parseInt(quantity, 10) * 100) / 100);

export const parseOrdersList = list => list.map(order => ({
  status: order.ExecutionStatus,
  id: order.Id,
  values: {
    id: Math.random(),
    // sec_name: order.Name,
    sec_name: order.SymbolDescription,
    symbol: order.Symbol,
    // date: parseOrderDate(order.Date),
    currency: order.SecurityCurrency,
    price: order.AveragePrice,
    order_quantity: order.Quantity * (order.Side === 'Sell' ? -1 : 1),
    fill_quantity: order.ExecutedQuantity,
    remain_quantity: order.LeavesQuantity,
    notional_ammount: calculateOrderPrice(order.AveragePrice, order.Quantity), // TODO find the way how to calculate
    comission: '--', // TODO find the way how to calculate
    distance: calculateOrderDistance(order.AveragePrice, order.LastPrice),
    start_date: parseDateString(order.CreateDate, 'MM/DD/YY'),
    qct: '--', // TODO Investigate how to calculate
  },
}));

export const parseWatchList = list => ({
  id: list.Id,
  name: list.Name,
  type: list.Type,
  content: list.SecurityList.map(position => (
    {
      id: Math.random(),
      sec_name: position.Description,
      symbol: position.Symbol,
      // date: parseOrderDate(position.AddedDate),
      currency: position.Currency,
      last_p: '--', // TODO where could be find
      bid_sz: '--', // TODO where could be find
      bid: '--', // TODO where could be find
      off: '--', // TODO where could be find,
      off_size: position.ContractSize, // not sure about this
      day_volume: '--', // TODO where could be find,
      sentiment: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      esch: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      pe_ratio: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      secID: position.Id, // Not Used in Phase 1 (will not be available from Etna in any case)
      rating: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
    }
  )),
});


export const parsePositionsList = list => (list.map(pos => ({
  id: Math.random(),
  // start_date: parseOrderDate(pos.CreateDate).slice(0, 10),
  start_date: pos.CreateDate,
  symbol: pos.Symbol,
  sec_name: pos.CompanyName,
  sec_id: pos.SecurityId,
  category: pos.SecurityType,
  country: 'USA', // For Phase 1 - default Country of Settlement to USA (TODO: needs to be modifed once we trade in Europe)
  currency: pos.SecurityCurrency,
  ann_cf: '--', // TODO investigate about calculation
  carry: '--', // This is the total CF dividend and interest on this postions from it's inception - Not Used in Phase 1
  ann_ret: '--', // TODO investigate about calculation (1+Positions.PortfolioPositions.Total%Ch)^(today-Positions.PortfolioPositions.StartDate)/365.25)-1
  var_cont: '--', // This is the Value at Risk contributed to the overall portfolio - Not Used in Phase 1
  avg_price: pos.AverageOpenPrice, // should it be avg open or close price?
  quantity: pos.Quantity,
  m2m: '--', // This is the last price (or previous close if market closed) from our live data feed TODO: investigate source this data
  notional: '--', // QuantityxPositions.PortfolioPositions.M2M
  total_chg: '--', // (Positions.PortfolioPositions.M2M-Positions.PortfolioPositions.AvePrice)/Positions.PortfolioPositions.AvePrice*100
  total_pl: '--', // This is the Total P&L including all components such as carry and M2M - Not Used in Phase 1
  day_chg: '--', // TODO investigate about calculation
  day_pl: '--', // TODO investigate about calculation
  rpl: pos.RealizedProfitLoss,
  prev_close_avg: pos.AverageClosePrice,
})));

const popupText = {
  dashboard_community_league: {
    text: 'Lorem lorem lorem lorem lorem lorem lorem lorem.',
    title: 'Community league',
  },
};

export const getTableHeaderByName = tableName => tableHeaders[tableName];
export const getWidgetAttributesByName = widgetName => widgetAttributes[widgetName];
export const getPopupTextById = id => popupText[id].text;
export const getPopupTitleById = id => popupText[id].title;
