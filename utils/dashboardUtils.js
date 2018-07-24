import moment from 'moment';
import { uniqueId } from 'lodash';


const widgetAttributes = {
  overview_social_capital: {
    id: 'overview_social_capital',
    title: 'Social capital',
    icon: 'groups',
    col: 5,
    height: 390,
    padding_left: 24,
  },
  overview_financial_capital_exposure: {
    id: 'overview_financial_capital_exposure',
    title: 'Financial capital',
    icon: 'community',
    col: 5,
    height: 390,
    padding_left: 10,
  },
  overview_environmental_capital: {
    id: 'overview_environmental_capital',
    title: 'Environmental capital',
    icon: 'environmental',
    col: 4,
    height: 390,
    padding_left: 40,
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
    height: 568,
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
    col: 12,
    height: 222,
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
        '205px',
      ],
      sortable: [
        false,
        true,
        false,
        true,
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
      'VAR Count',
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
        true
      ],
    },
  },
  overview_financial_capital_exposure: {
    id: 'overview_financial_capital_exposure',
    height: 230,
    headers: [
      'Exposure',
      'Value',
      'Day chg',
    ],
    attrs: {
      width: [
        '115px',
        '85px',
        '60px',
      ],
      sortable: [
      ],
    },
  },
  overview_financial_capital_allocation: {
    id: 'overview_financial_capital_allocation',
    height: 230,
    headers: [
      'Allocation',
      'Domestic',
      'Foreign',
    ],
    attrs: {
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
    height: 390,
    padding_left: 10,
    headers: [
      'ST performance',
      '% change',
      'Vs indexes',
    ],
    attrs: {
      width: [
        '115px',
        '70px',
        '75px',
      ],
      sortable: [
      ],
    },
  },
  overview_financial_capital_performance_lt: {
    id: 'overview_financial_capital_performance_lt',
    title: 'Financial capital performance',
    col: 5,
    height: 390,
    headers: [
      'LT Performance',
      '% change',
      'Vs indexes',
    ],
    attrs: {
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
    height: 230,
    headers: [
      'Network',
      'No.',
    ],
    attrs: {
      width: [
        '125px',
        '80px',
      ],
      sortable: [
      ],
    },
  },
  overview_social_capital_positioning: {
    id: 'overview_social_capital_positioning',
    height: 230,
    headers: [
      'Positioning',
      '%ile',
    ],
    attrs: {
      width: [
        '115px',
        '75px',
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
      width: [
        '130px',
        '85px',
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
      width: [
        '115px',
        '75px',
      ],
      sortable: [
      ],
    },
  },
  overview_environmental_capital_size_growth: {
    id: 'overview_environmental_capital_size_growth',
    headers: [
      'Size & growth',
      'No.',
    ],
    attrs: {
      width: [
        '175px',
        '80px',
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
      width: [
        '175px',
        '80px',
      ],
      sortable: [
      ],
    },
  },
};


export const getFormattedNumber = number => number.toString().replace(/[^0-9]/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
export const formatNumberWithFixedPoint = (number, n) => {
  if (!n || n === 0) return getFormattedNumber(Math.round(number));
  const vals = Number(number).toFixed(n).split('.');
  return [getFormattedNumber(vals[0]), vals[1]].join('.');
};

/* ========= parses the date from specified string ======== */
/* ========= like '/Date(1530076567409+0000)/' ==========  */
export const parseOrderDate = str => new Date(parseInt(str.match(/\d+(\+\d+)?/)[0], 10)).toLocaleString();
const parseDateString = (str, pattern) => {
  if (!pattern) return moment(str).format('DD-MM-YYYY');
  return moment(str).format(pattern);
};

// TODO maybe will need some correction when watchlist appears
export const calculateOrderDistance = (price, lastPrice) =>
  Math.abs(Math.round(((price - lastPrice) * 100) / price));

export const calculateOrderPrice = (symbolPrice, quantity) =>
  (Math.round(parseFloat(symbolPrice) * parseInt(quantity, 10) * 100) / 100).toFixed(2);

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
    price: calculateOrderPrice(order.AveragePrice, order.Quantity),
    order_quantity: order.Quantity,
    fill_quantity: order.ExecutedQuantity,
    remain_quantity: order.LeavesQuantity,
    notional_ammount: '--', // TODO find the way how to calculate
    comission: '--', // TODO find the way how to calculate
    distance: calculateOrderDistance(order.AveragePrice, order.LastPrice),
    // start_date: parseOrderDate(order.CreateDate),
    start_date: moment(order.CreateDate).format('MM/DD/YY'),
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
  start_date: parseOrderDate(pos.CreateDate).slice(0, 10),
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
})));


export const getTableHeaderByName = tableName => tableHeaders[tableName];
export const getWidgetAttributesByName = widgetName => widgetAttributes[widgetName];
