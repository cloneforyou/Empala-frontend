import React from 'react';
import { connect } from 'react-redux';
import { reduce } from 'lodash';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';


const getColorForNumericValue = (value) => {
  if (!value || Number.isNaN(value) || value === '--') return null;
  return value > 0 ? 'green' : 'red';
};
const widget = getWidgetAttributesByName('overview_financial_capital_exposure');
const marketAllocations = [
  'Emara',
  'Currencies',
  'CommonStock',
  'Bonds',
  'CorpBonds',
  'Hybrid',
  'Commodities',
  'Private',
];

const parsePerformanceData = (data, tableName) => {
  if (tableName === 'overview_financial_capital_performance_st') {
    return Object.keys(data).slice(1, 5).map(key => [
      { value: key },
      {
        value: formatNumberWithFixedPoint(data[key]['% change'], 1),
        color: getColorForNumericValue(data[key]['% change']),
      },
      { value: formatNumberWithFixedPoint(data[key]['Vs indexes'], 1) },
    ]);
  }
  if (tableName === 'overview_financial_capital_performance_lt') {
    return Object.keys(data).slice(5).map(key => [
      { value: key },
      {
        value: formatNumberWithFixedPoint(data[key]['% change'], 1),
        color: getColorForNumericValue(data[key]['% change']),
      },
      { value: formatNumberWithFixedPoint(data[key]['Vs indexes'], 1) },
    ]);
  }
  return [];
};

const parsePositionsToTableData = (tableName, positions, balance) => {
  // todo maybe need to remove positions;
  // all data should be get from server?
  const calculateTotal = () => reduce(
    marketAllocations.map(all => calculateDomesticByType(all) + calculateForeignByType(all)),
    (sum, value) => sum + value,
  );
  const calculateDomestic =
    reduce(positions, (sum, value, index) => sum + positions[index].CostBasis, 0);
  const calculateForeignByType = type => 0; // todo calculation workflow
  const calculateDomesticByType = (type) => {
    if (!type) return calculateDomestic;
    return reduce(positions, (sum, value, index) => {
      if (type === 'CommonStock') return balance.ETNA.netLiquidity.Value;
      if (positions[index].SecurityType === type) return sum + positions[index].CostBasis;
      return 0;
    }, 0);
  };
  const calculateTotalAcValue = () => {
    // TODO modify later to support other BD data
    const equities = Object.keys(balance).map(el => (balance[el].equityTotal || {}).Value || 0);
    return equities.reduce((a, b) => a + b, 0);
  };
  const exposures = [
    {
      name: 'Total a/c value',
      value: calculateTotalAcValue(),
      day_ch: (balance.ETNA.changePercent || {}).Value,
      color: getColorForNumericValue((balance.ETNA.changePercent || {}).Value),
    },
    { name: 'Net position', value: calculateTotal(), day_ch: 0 },
    { name: 'Adj net position', value: 0, day_ch: 0 },
    { name: 'Gross position', value: 0, day_ch: 0 },
    { name: 'Adj gross position', value: 0, day_ch: 0 },
    { name: 'Estimated VAR', value: 0, day_ch: 0 },
    { name: 'Annualized carry', value: 0, day_ch: 0 },
    { name: 'Credit available', value: 0, day_ch: 0 },
  ];
  // Type names just a stub except CommonStock. todo investigate type names
  const allocations = [
    { name: 'EMARA & MM', domestic: calculateDomesticByType('Emara'), foreign: calculateForeignByType('Emara') },
    { name: 'Currencies & MM', domestic: calculateDomesticByType('Currencies'), foreign: calculateForeignByType('Currencies') },
    { name: 'Stocks', domestic: balance.ETNA.marketValue.Value, foreign: calculateForeignByType('CommonStock') },
    // { name: 'Stocks', domestic: calculateDomesticByType('CommonStock'), foreign: calculateForeignByType('CommonStock') },
    { name: 'Govt bonds', domestic: calculateDomesticByType('Bonds'), foreign: calculateForeignByType('Bonds') },
    { name: 'Corp bonds', domestic: calculateDomesticByType('CorpBonds'), foreign: calculateForeignByType('CorpBonds') },
    { name: 'Hybrid & others', domestic: calculateDomesticByType('Hybrid'), foreign: calculateForeignByType('Hybrid') },
    { name: 'Commodities', domestic: calculateDomesticByType('Commodities'), foreign: calculateForeignByType('Commodities') },
    { name: 'Private markets', domestic: calculateDomesticByType('Private'), foreign: calculateForeignByType('Private') },
  ];

  // return getTableDataByName(tableName);
  return {
    exposures,
    allocations,
  };
};

const getTableDataByName = (tableName, positions, balance, dayChange) => {
  const { exposures, allocations } = parsePositionsToTableData(tableName, positions, balance);
  const dayChangePercent = (dayChange || {})['% change'];
  if (dayChangePercent) exposures[0].day_ch = dayChangePercent;
  if (tableName === 'overview_financial_capital_exposure') {
    return exposures.map(exp => [
      { value: exp.name },
      { value: formatNumberWithFixedPoint(exp.value) },
      { value: formatNumberWithFixedPoint(exp.day_ch, 1), color: exp.color },
    ]);
  }
  if (tableName === 'overview_financial_capital_allocation') {
    return allocations.map(all => [
      { value: all.name },
      { value: formatNumberWithFixedPoint(all.domestic) },
      { value: formatNumberWithFixedPoint(all.foreign) },
    ]);
  }
  return [];
};

const FinancialCapitalTable = props => (
  <div
    className="widget-col d-inline-block"
    key={widget.id}
  >
    <div
      className="widget"
      style={
        {
          height: `${widget.height}px`,
          paddingLeft: `${widget.padding_left && widget.padding_left}px`,
          paddingRight: `${widget.padding_right && widget.padding_right}px`,
        }
      }
    >
      <WidgetHead
        widget={widget}
      />
      <div className="d-inline-block align-top">
        {
          props.accountBalance &&
          <EmpalaTable
            tableName="overview_financial_capital_exposure"
            tableData={
              getTableDataByName(
                'overview_financial_capital_exposure',
                props.positions, props.accountBalance,
                props.financial.performance['1 Day'],
              )
            }
            small
          />
        }
      </div>
      <div className="d-inline-block align-top">
        {
          props.accountBalance &&
          <EmpalaTable
            tableName="overview_financial_capital_allocation"
            tableData={getTableDataByName('overview_financial_capital_allocation', props.positions, props.accountBalance)}
            small
          />
        }
      </div>
      <div className="w-100" />
      <div className="d-inline-block align-top">
        <EmpalaTable
          tableName="overview_financial_capital_performance_st"
          tableData={props.financial.performance ?
            parsePerformanceData(props.financial.performance, 'overview_financial_capital_performance_st')
          : []
          }
          small
        />
      </div>
      <div className="d-inline-block align-top">
        <EmpalaTable
          tableName="overview_financial_capital_performance_lt"
          tableData={props.financial.performance ?
            parsePerformanceData(props.financial.performance, 'overview_financial_capital_performance_lt')
            : []
          }
          small
        />
      </div>
    </div>
  </div>
);

const MapStateToProps = state => ({
  positions: state.dashboard.positions ? state.dashboard.positions : [],
  financial: state.dashboard.userData.data.financial_capital || {},
  accountBalance: state.dashboard.accountBalance,
});

export default connect(MapStateToProps)(FinancialCapitalTable);

