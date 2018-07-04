/* ========= parses the date from specified string ======== */
/* ========= like '/Date(1530076567409+0000)/' ==========  */
export const parseOrderDate = str => new Date(parseInt(str.match(/\d+(\+\d+)?/)[0], 10)).toLocaleString();

// TODO maybe will need some correction when watchlist appears
export const calculateOrderDistance = (price, lastPrice) =>
  Math.abs(Math.round(((price - lastPrice) * 100) / price));

export const calculateOrderPrice = (symbolPrice, quantity) =>
  (Math.round(parseFloat(symbolPrice) * parseInt(quantity, 10) * 100) / 100).toFixed(2);

export const parseOrdersList = list => list.map(order => ({
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
  start_date: parseOrderDate(order.CreateDate),
  qct: '--', // TODO Investigate how to calculate

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
      secID: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
      rating: '--', // Not Used in Phase 1 (will not be available from Etna in any case)
    }
  )),
});

export const parsePositionsList = list => (list.map(pos => ({
  id: Math.random(),
  start_date: parseOrderDate(pos.CreateDate),
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
