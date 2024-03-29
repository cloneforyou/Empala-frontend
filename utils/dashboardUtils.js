import moment from 'moment';
import { uniqueId } from 'lodash';
import { widgetAttributes, tableHeaders } from '../localdata/dashboardTablesDescriptor';

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

const getSymbolPriceByType = (order) => {
  if (!order) return 0;
  switch (order.Type) {
    case 'Limit':
      return order.Price;
    case 'Stop':
      return order.StopPrice;
    default:
      return order.AveragePrice;
  }
};

export const parseOrdersList = list => list.map(order => {
  const symbolPrice = getSymbolPriceByType(order);
  return {
    status: order.ExecutionStatus,
    id: order.Id,
    side: order.Side,
    values: {
      id: Math.random(),
      // sec_name: order.Name,
      sec_name: order.SymbolDescription,
      symbol: order.Symbol,
      // date: parseOrderDate(order.Date),
      currency: order.SecurityCurrency,
      price: symbolPrice,
      order_quantity: order.Quantity * (order.Side === 'Sell' ? -1 : 1),
      fill_quantity: order.ExecutedQuantity,
      remain_quantity: order.LeavesQuantity,
      notional_ammount: calculateOrderPrice(symbolPrice, order.Quantity), // TODO find the way how to calculate
      comission: '--', // TODO find the way how to calculate
      distance: calculateOrderDistance(symbolPrice, order.LastPrice),
      start_date: parseDateString(order.CreateDate, 'MM/DD/YY'),
      oct: '--', // TODO Investigate how to calculate
    },
  };
});

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
  daily_cost_basis: pos.DailyCostBasis,
})));

const popupText = {
  dashboard_community_league: {
    text: 'Lorem lorem lorem lorem lorem lorem lorem lorem.',
    title: 'Community league',
  },
  funding_transfer_approved: {
    text: 'Transfer approval wording.',
    title: 'Transfer approved',
  },
};

export function generateId() {
  return String(Date.now() + Math.floor(Math.random() * Math.random() * 1000000)).substr(3, 12);
}

export const getTableHeaderByName = tableName => tableHeaders[tableName];
export const getWidgetAttributesByName = widgetName => widgetAttributes[widgetName];
export const getPopupTextById = id => popupText[id].text;
export const getPopupTitleById = id => popupText[id].title;
