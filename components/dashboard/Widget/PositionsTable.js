import React from 'react';
import { connect } from 'react-redux';
import { reduce, uniqueId } from 'lodash';
import { widgetsPositionFirst } from '../../../localdata/dashboardWidgets';
import WidgetTable from './WidgetTable';
import { formatNumberWithFixedPoint } from '../../../utils/dashboardUtils';

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



export const parsePositionsTablesData = (tables, data) => {
  if (tables.length > 0) {
    const calculateDomestic = reduce(data, (sum, value, index) => sum + data[index].CostBasis, 0);
    const calculateDomesticByType = (type) => {
      if (!type) return calculateDomestic;
      return reduce(data, (sum, value, index) => {
        if (data[index].SecurityType === type) return sum + data[index].CostBasis;
        return 0;
      }, 0);
    };
    const domestic = {
      notional: {
        net: calculateDomesticByType(),
        stocks: calculateDomesticByType('CommonStock'),
        emara: '--',
        currencies: '--',
        governmentBonds: '--',
        corporateBonds: '--',
        hybrids: '--',
        commodities: '--',
        private: '--',
      },
      percent: {
        net: calculateDomesticByType(),
        stocks: calculateDomesticByType('CommonStock'),
        emara: '--',
        currencies: '--',
        governmentBonds: '--',
        corporateBonds: '--',
        hybrids: '--',
        commodities: '--',
        private: '--',
      },
      adjusted: {
        net: ' ',
        stocks: '--',
        emara: '--',
        currencies: '--',
        governmentBonds: '--',
        corporateBonds: '--',
        hybrids: '--',
        commodities: '--',
        private: '--',
      },
      riskMeasures: {
        net_position: '--',
        adjusted_net_position: '--',
        gross_position: '--',
        adjusted_gross_position: '--',
        estimated_var: '--',
        regulatory_margin: '--',
      },
      riskTheoreticals: {
        portfolio_1pc_delta: '--',
        portfolio_1pc_gamma: '--',
        portfolio_1d_theta: '--',
        portfolio_5pc_vega: '--',
        portfolio_1pc_Rho: '--',
      },
      fundingAnalysis: {
        annualized_carry: '--',
      },
      creditAnalysis: {
        credit_available: '--',
      },
      financialCapital: {
        total_ac: '--',
        net_position: '--',
        adjusted_net_position_short: '--',
        gross_position: '--',
        adjusted_gross_position_short: '--',
        estimated_var: '--',
        annualized_carry: '--',
        credit_available: '--',
      },
    };
    const foreign = {
      notional: {
        net: 0,
        stocks: 0,
        emara: '--',
        currencies: '--',
        governmentBonds: '--',
        corporateBonds: '--',
        hybrids: '--',
        commodities: '--',
        private: '--',
      },
      percent: {
        net: 0,
        stocks: 0,
        emara: '--',
        currencies: '--',
        governmentBonds: '--',
        corporateBonds: '--',
        hybrids: '--',
        commodities: '--',
        private: '--',
      },
      adjusted: {
        net: ' ',
        stocks: '--',
        emara: '--',
        currencies: '--',
        governmentBonds: '--',
        corporateBonds: '--',
        hybrids: '--',
        commodities: '--',
        private: '--',
      },
      riskMeasures: {
        net_position: '--',
        adjusted_net_position: '--',
        gross_position: '--',
        adjusted_gross_position: '--',
        estimated_var: '--',
        regulatory_margin: '--',
      },
      riskTheoreticals: {
        portfolio_1pc_delta: '--',
        portfolio_1pc_gamma: '--',
        portfolio_1d_theta: '--',
        portfolio_5pc_vega: '--',
        portfolio_1pc_Rho: '--',
      },
      fundingAnalysis: {
        annualized_carry: '--',
      },
      creditAnalysis: {
        credit_available: '--',
      },
      financialCapital: {
        total_ac: '--',
        net_position: '--',
        adjusted_net_position_short: '--',
        gross_position: '--',
        adjusted_gross_position_short: '--',
        estimated_var: '--',
        annualized_carry: '--',
        credit_available: '--',
      },
    };
    const getChangeByTitleAndType = (title, type) => {
      switch (title) {
        case 'adjusted':
          switch (type) {
            case 'net':
              return ' ';
            default:
              return ' ';
          }
        default:
          return '--';
      }
    };
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
        const calculatedTotal = calculatedDomestic + calculatedForeign;
        if (title === 'percent') {
          return {
            id: uniqueId(),
            exposure: getExposureByType(type),
            domestic: formatNumberWithFixedPoint((calculatedDomestic * 100 / calculatedTotal), 1) || '--',
            foreign: formatNumberWithFixedPoint((calculatedForeign * 100 / calculatedTotal), 1) || '--',
            total: formatNumberWithFixedPoint(100, 1),
            dayChange: getChangeByTitleAndType(title, type),
          };
        }
        if (title === 'financialCapital') {
          return {
            id: uniqueId(),
            exposure: getExposureByType(type),
            value: calculatedTotal,
            dayChange: getChangeByTitleAndType(title)(type),
            allocation: 'allocation',
            domestic: formatNumberWithFixedPoint((calculatedDomestic * 100 / calculatedTotal), 1) || '--',
            foreign: formatNumberWithFixedPoint((calculatedForeign * 100 / calculatedTotal), 1) || '--',
          };
        }
        return {
          id: uniqueId(),
          exposure: getExposureByType(type),
          domestic: formatNumberWithFixedPoint(calculatedDomestic, 0),
          foreign: formatNumberWithFixedPoint(calculatedForeign, 0),
          total: formatNumberWithFixedPoint(calculatedTotal, 0),
          dayChange: formatNumberWithFixedPoint(getChangeByTitleAndType(title, type), 1),
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
        tables: parsePositionsTablesData(widget.tables, props.positions),
      }}
      key={widget.id}

    />
  )));

export default connect(state => ({
  positions: state.dashboard.positions ? state.dashboard.positions : [],
}))(PositionsTable);
