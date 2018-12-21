/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import { reduce, uniqueId } from 'lodash';
import { widgetsPositionFirst } from '../../../localdata/dashboardWidgets';
import WidgetTable from './WidgetTable';
import { formatNumberWithFixedPoint } from '../../../utils/dashboardUtils';

const stub = '--';
const rawNames = {
  net: 'Net value',
  emara: 'Emara & Money Market',
  currencies: 'Currencies & Money Market',
  stocks: 'Stocks',
  governmentBonds: 'Government Bonds',
  corporateBonds: 'Corporate Bonds',
  hybrids: 'Hybrids & Other Securities',
  commodities: 'Commodities',
  private: 'Private Markets',
  net_position: 'Net Position',
  adjusted_net_position: 'Adjusted Net Position',
  gross_position: 'Gross Position',
  adjusted_gross_position: 'Adjusted Gross Position',
  estimated_var: 'Estimated VAR',
  regulatory_margin: 'Regulatory Margin',
  portfolio_1pc_delta: 'Portfolio 1% Delta',
  portfolio_1pc_gamma: 'Portfolio 1% Gamma',
  portfolio_1d_theta: 'Portfolio 1D Theta',
  portfolio_5pc_vega: 'Portfolio 5% Vega',
  portfolio_1pc_Rho: 'Portfolio 1% Rho',
  annualized_carry: 'Annualized Carry',
  credit_available: 'Credit Available',
  emara_short: 'EMARA & MM',
  currencies_short: 'Currencies & MM',
  governmentBonds_short: 'Govt bonds',
  corporateBonds_short: 'Corp bonds',
  hybrids_short: 'Hybrid & others',
  total_ac: 'Total a/c value',
  adjusted_net_position_short: 'Adj net position',
  adjusted_gross_position_short: 'Adj gross position',
};

export const parsePositionsTablesData = (tables, positionsData, quotesData, balance) => {
  const getPositionMark = (pos) => {
    if (!pos || !quotesData || !quotesData[pos.SecurityId]) return false;
    return quotesData[pos.SecurityId].Mark;
  };
  // calculates values based on ETNA data
  // todo modify for another broker dealers
  const calculateMarketValue = pos => getPositionMark(pos) * pos.Quantity * (pos.SecurityType === 'CommonStock' ? 1 : 100);
  const calculatePrevMarketValue = (pos, quote) =>
    (quote && quote.Close * pos.Quantity * (pos.SecurityType === 'CommonStock' ? 1 : 100)) || pos.DailyCostBasis;
  const calculateDayRPL = pos => (pos && pos.RealizedProfitLoss ? pos.RealizedProfitLoss : 0);
  const calculateDayPL = (pos, quote) => (calculateMarketValue(pos) - calculatePrevMarketValue(pos, quote)) + calculateDayRPL(pos);
  const calculateTotalRPL = positions => reduce(positions, (sum, pos) => sum + calculateDayRPL(pos), 0);
  const calculateTotalDayPL = (positions, quotes) => {
    if (!(positions && quotes)) return 0;
    return reduce(positions, (sum, pos) => sum + calculateDayPL(pos, quotes[pos.SecurityId]), 0);
  };

  if (tables.length > 0) {
    // old calculation. TODO remove later if wrong
    // const calculateDomestic = reduce(positionsData, (sum, value, index) => sum + positionsData[index].CostBasis, 0);
    const calculateDomestic = reduce(positionsData, (sum, value, index) => sum + calculateMarketValue(positionsData[index]), 0);
    const calculateDomesticByType = (type) => {
      if (!type) return calculateDomestic;
      if (type === 'currencies') return ((balance.ETNA || {}).netCash || {}).Value || 0; // todo modify for multiple Broker Dealers
      return reduce(positionsData, (sum, value, index) => {
        // old calculation. TODO remove later if wrong
        // if (positionsData[index].SecurityType === type) return sum + positionsData[index].CostBasis;
        if (positionsData[index].SecurityType === type) return sum + calculateMarketValue(positionsData[index]);
        return 0;
      }, 0);
    };
    const getQuoteChange = secId =>
      (quotesData[secId] ? (quotesData[secId].Last - quotesData[secId].PreviousClose) : 0);
    const calculateChange = reduce(positionsData, (sum, value, index) => sum + getQuoteChange(positionsData[index].SecurityId), 0);
    const calculateChangeByType = (type) => {
      if (!type) return calculateChange;
      return reduce(positionsData, (sum, value, index) => {
        if (positionsData[index].SecurityType === type) return sum + getQuoteChange(positionsData[index].SecurityId);
        return 0;
      }, 0);
    };

    const calculateTotalDayChange = (type) => {
      if (type === 'CommonStock') return balance.ETNA.changePercent.Value;
      /* calculates day change using formula
      (unrealized p&l + realized p&l)/(account value - unrealized p&l - realized p&l) */
      /* used for ETNA calculations */
      // const RPLTotal = calculateTotalRPL(positionsData);
      // const DayPLTotal = calculateTotalDayPL(positionsData, quotesData); // unrealised PL ?
      // const accountValue = calculateDomesticByType('CommonStock');
      // console.log(accountValue)
      // return ((DayPLTotal + RPLTotal) / (accountValue - DayPLTotal - RPLTotal)) * 100; // percents
      return (balance.ETNA.openPL.Value + balance.ETNA.closePL.Value)
        / (balance.ETNA.equityTotal.Value - balance.ETNA.openPL.Value - balance.ETNA.closePL.Value);
    };

    const domestic = {
      notional: {
        net: calculateDomesticByType('CommonStock') + calculateDomesticByType('currencies'),
        stocks: calculateDomesticByType('CommonStock'),
        emara: stub,
        currencies: calculateDomesticByType('currencies'),
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      percent: {
        net: calculateDomesticByType('CommonStock') + calculateDomesticByType('currencies'),
        stocks: calculateDomesticByType('currencies'),
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      adjusted: {
        net: stub,
        stocks: stub,
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      riskMeasures: {
        net_position: stub,
        adjusted_net_position: stub,
        gross_position: stub,
        adjusted_gross_position: stub,
        estimated_var: stub,
        regulatory_margin: stub,
      },
      riskTheoreticals: {
        portfolio_1pc_delta: stub,
        portfolio_1pc_gamma: stub,
        portfolio_1d_theta: stub,
        portfolio_5pc_vega: stub,
        portfolio_1pc_Rho: stub,
      },
      fundingAnalysis: {
        annualized_carry: stub,
      },
      creditAnalysis: {
        credit_available: stub,
      },
      financialCapital: {
        total_ac: stub,
        net_position: stub,
        adjusted_net_position_short: stub,
        gross_position: stub,
        adjusted_gross_position_short: stub,
        estimated_var: stub,
        annualized_carry: stub,
        credit_available: stub,
      },
    };
    const foreign = {
      notional: {
        net: 0,
        stocks: 0,
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      percent: {
        net: 0,
        stocks: 0,
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      adjusted: {
        net: ' ',
        stocks: stub,
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      riskMeasures: {
        net_position: stub,
        adjusted_net_position: stub,
        gross_position: stub,
        adjusted_gross_position: stub,
        estimated_var: stub,
        regulatory_margin: stub,
      },
      riskTheoreticals: {
        portfolio_1pc_delta: stub,
        portfolio_1pc_gamma: stub,
        portfolio_1d_theta: stub,
        portfolio_5pc_vega: stub,
        portfolio_1pc_Rho: stub,
      },
      fundingAnalysis: {
        annualized_carry: stub,
      },
      creditAnalysis: {
        credit_available: stub,
      },
      financialCapital: {
        total_ac: stub,
        net_position: stub,
        adjusted_net_position_short: stub,
        gross_position: stub,
        adjusted_gross_position_short: stub,
        estimated_var: stub,
        annualized_carry: stub,
        credit_available: stub,
      },
    };
    const change = {
      notional: {
        net: /*calculateChangeByType()*/ calculateTotalDayChange(), // todo check what calculation is right
        stocks: calculateTotalDayChange('CommonStock'),
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      percent: {
        net: /*calculateChangeByType()*/ calculateTotalDayChange(), // todo check what calculation is right
        stocks: calculateTotalDayChange('CommonStock'),
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      adjusted: {
        net: ' ',
        stocks: stub,
        emara: stub,
        currencies: stub,
        governmentBonds: stub,
        corporateBonds: stub,
        hybrids: stub,
        commodities: stub,
        private: stub,
      },
      riskMeasures: {
        net_position: stub,
        adjusted_net_position: stub,
        gross_position: stub,
        adjusted_gross_position: stub,
        estimated_var: stub,
        regulatory_margin: stub,
      },
      riskTheoreticals: {
        portfolio_1pc_delta: stub,
        portfolio_1pc_gamma: stub,
        portfolio_1d_theta: stub,
        portfolio_5pc_vega: stub,
        portfolio_1pc_Rho: stub,
      },
      fundingAnalysis: {
        annualized_carry: stub,
      },
      creditAnalysis: {
        credit_available: stub,
      },
      financialCapital: {
        total_ac: stub,
        net_position: stub,
        adjusted_net_position_short: stub,
        gross_position: stub,
        adjusted_gross_position_short: stub,
        estimated_var: stub,
        annualized_carry: stub,
        credit_available: stub,
      },
    };

    const getChangeByTitleAndType = title => type => change[title][type];
    const getDomesticByTitleAndType = title => type => domestic[title][type];
    const getForeignByTitleAndType = title => type => foreign[title][type];
    const getExposureByType = type => rawNames[type];
    const mapTableTitleToData = (title) => {
      let types = [];
      if (title === 'notional' || title === 'percent' || title === 'adjusted') {
        types = [
          'net',
          'emara',
          'currencies',
          'stocks',
          'governmentBonds',
          'corporateBonds',
          'hybrids',
          'commodities',
          'private',
        ];
      }
      if (title === 'riskMeasures') {
        types = [
          'net_position',
          'adjusted_net_position',
          'gross_position',
          'adjusted_gross_position',
          'estimated_var',
          'regulatory_margin',
        ];
      }
      if (title === 'riskTheoreticals') {
        types = [
          'portfolio_1pc_delta',
          'portfolio_1pc_gamma',
          'portfolio_1d_theta',
          'portfolio_5pc_vega',
          'portfolio_1pc_Rho',
        ];
      }
      if (title === 'creditAnalysis') {
        types = [
          'credit_available',
        ];
      }
      if (title === 'fundingAnalysis') {
        types = [
          'annualized_carry',
        ];
      }
      if (title === 'financialCapital') {
        types = [
          'total_ac',
          'net_position',
          'adjusted_net_position_short',
          'gross_position',
          'adjusted_gross_position_short',
          'estimated_var',
          'annualized_carry',
          'credit_available',
        ];
      }
      return types.map((type) => {
        const calculatedDomestic = getDomesticByTitleAndType(title)(type);
        const calculatedForeign = getForeignByTitleAndType(title)(type);
        const calculateTotal = () => {
          const domesticValue = Number.isNaN(Number(calculatedDomestic)) ? 0 : calculatedDomestic;
          const foreignValue = Number.isNaN(Number(calculatedForeign)) ? 0 : calculatedForeign;
          return domesticValue + foreignValue;
        };
        const calculatedChange = getChangeByTitleAndType(title)(type);
        if (title === 'percent') {
          return {
            id: uniqueId(),
            exposure: getExposureByType(type),
            domestic: formatNumberWithFixedPoint((calculatedDomestic * 100) / calculateTotal(), 2) || stub,
            foreign: formatNumberWithFixedPoint((calculatedForeign * 100) / calculateTotal(), 2) || stub,
            total: type === 'net' || type === 'stocks' ? formatNumberWithFixedPoint(100, 2) : stub,
            dayChange: formatNumberWithFixedPoint(calculatedChange, 2),
          };
        }
        if (!([
          'notional',
          'percent',
        ].includes(title))) {
          return {
            id: uniqueId(),
            exposure: getExposureByType(type),
            domestic: stub,
            foreign: stub,
            total: stub,
            dayChange: stub,
          };
        }
        return {
          id: uniqueId(),
          exposure: getExposureByType(type),
          domestic: formatNumberWithFixedPoint(calculatedDomestic, 2),
          foreign: formatNumberWithFixedPoint(calculatedForeign, 2),
          total: type === 'net' || type === 'stocks' ? formatNumberWithFixedPoint(calculateTotal(), 2) : stub,
          dayChange: formatNumberWithFixedPoint(calculatedChange, 2),
        };
      });
    };
    return tables.map((table) => {
      if (!table) return [];
      return {
        ...table,
        data: mapTableTitleToData(table.title),
      };
    });
  }
};

const PositionsTable = props => (
  widgetsPositionFirst.map(widget => (
    <WidgetTable
      widget={{
        ...widget,
        tables: parsePositionsTablesData(widget.tables, props.positions, props.quotes, props.balance),
      }}
      key={widget.id}

    />
  )));

export default connect(state => ({
  positions: state.dashboard.positions ? state.dashboard.positions : [],
  quotes: state.dashboard.quotes,
  balance: state.dashboard.accountBalance
    || { ETNA: {} },
}))(PositionsTable);
