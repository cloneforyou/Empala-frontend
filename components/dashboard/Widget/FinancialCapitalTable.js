import React from 'react';
import { connect } from 'react-redux';
import WidgetHead from './WidgetHead';
import EmpalaTable from '../EmpalaTable';
import {
  formatNumberWithFixedPoint,
  getTableHeaderByName,
  getWidgetAttributesByName,
} from '../../../utils/dashboardUtils';
import { reduce } from 'lodash';


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
    return Object.keys(data).slice(0, 4).map(key => [
      { value: key },
      { value: formatNumberWithFixedPoint(data[key]['% change'], 1) },
      { value: formatNumberWithFixedPoint(data[key]['Vs indexes'], 1) },
    ]);
  }
  if (tableName === 'overview_financial_capital_performance_lt') {
    return Object.keys(data).slice(4).map(key => [
      { value: key },
      { value: formatNumberWithFixedPoint(data[key]['% change'], 1) },
      { value: formatNumberWithFixedPoint(data[key]['Vs indexes'], 1) },
    ]);
  }
  return [];
};

const parsePositionsToTableData = (tableName, positions) => {
  const calculateTotal = () => reduce(
    marketAllocations.map(all => calculateDomesticByType(all) + calculateForeignByType(all)),
    (sum, value) => sum + value,
  );
  const calculateDomestic = reduce(positions, (sum, value, index) => sum + positions[index].CostBasis, 0);
  const calculateForeignByType = type => 0; // todo calculation workflow
  const calculateDomesticByType = (type) => {
    if (!type) return calculateDomestic;
    return reduce(positions, (sum, value, index) => {
      if (positions[index].SecurityType === type) return sum + positions[index].CostBasis;
      return 0;
    }, 0);
  };
  const exposures = [
    { name: 'Total a/c value', value: calculateTotal(), day_ch: '--' },
    { name: 'Net position', value: 0, day_ch: '--' },
    { name: 'Adj net position', value: 0, day_ch: '--' },
    { name: 'Gross position', value: 0, day_ch: '--' },
    { name: 'Adj gross position', value: 0, day_ch: '--' },
    { name: 'Estimated VAR', value: 0, day_ch: '--' },
    { name: 'Annualized carry', value: 0, day_ch: '--' },
    { name: 'Credit available', value: 0, day_ch: '--' },
  ];
  // Type names just a stub except CommonStock. todo investigate type names
  const allocations = [
    { name: 'EMARA & MM', domestic: calculateDomesticByType('Emara'), foreign: calculateForeignByType('Emara') },
    { name: 'Currencies & MM', domestic: calculateDomesticByType('Currencies'), foreign: calculateForeignByType('Currencies') },
    { name: 'Stocks', domestic: calculateDomesticByType('CommonStock'), foreign: calculateForeignByType('CommonStock') },
    { name: 'Govt bonds', domestic: calculateDomesticByType('Bonds'), foreign: calculateForeignByType('Bonds') },
    { name: 'Corp bonds', domestic: calculateDomesticByType('CorpBonds'), foreign: calculateForeignByType('CorpBonds') },
    { name: 'Hybrid & others', domestic: calculateDomesticByType('Hybrid'), foreign: calculateForeignByType('Hybrid') },
    { name: 'Commodities', domestic: calculateDomesticByType('Commodities'), foreign: calculateForeignByType('Commodities') },
    { name: 'Private markets', domestic: calculateDomesticByType('Private'), foreign: calculateForeignByType('Private') },
  ];
  const getTableDataByName = (tableName) => {
    if (tableName === 'overview_financial_capital_exposure') {
      return exposures.map(exp => [
        { value: exp.name },
        { value: formatNumberWithFixedPoint(exp.value, 2) },
        { value: formatNumberWithFixedPoint(exp.day_ch) },
      ]);
    }
    if (tableName === 'overview_financial_capital_allocation') {
      return allocations.map(all => [
        { value: all.name },
        { value: formatNumberWithFixedPoint(all.domestic, 2) },
        { value: formatNumberWithFixedPoint(all.foreign, 2) },
      ]);
    }
    // if (tableName === 'overview_financial_capital_performance_st') {
    //   return allocations.map(all => [
    //     { value: all.name },
    //     { value: formatNumberWithFixedPoint(all.domestic, 2) },
    //     { value: formatNumberWithFixedPoint(all.foreign, 2) },
    //   ]);
    // }
    // if (tableName === 'overview_financial_capital_performance_lt') {
    //   return allocations.map(all => [
    //     { value: all.name },
    //     { value: formatNumberWithFixedPoint(all.domestic, 2) },
    //     { value: formatNumberWithFixedPoint(all.foreign, 2) },
    //   ]);
    // }
    return [];
  };
  return getTableDataByName(tableName);
};

const FinancialCapitalTable = props => (
  <div
    className={`widget-col widget-col-${widget.col}`}
    key={widget.id}
  >
    <div
      className="widget"
      style={{ maxHeight: `${widget.height}px`, paddingLeft: `${widget.padding_left && widget.padding_left}px` }}
    >
      <WidgetHead
        widget={widget}
      />
      <div style={{ display: 'inline-block' }}>
        <EmpalaTable
          tableName="overview_financial_capital_exposure"
          tableData={parsePositionsToTableData('overview_financial_capital_exposure', props.positions)}
        />
      </div>
      <div style={{ display: 'inline-block' }}>
        <EmpalaTable
          tableName="overview_financial_capital_allocation"
          tableData={parsePositionsToTableData('overview_financial_capital_allocation', props.positions)}
        />
      </div>
      <div className="w-100" />
      <div className="d-inline-block">
        <EmpalaTable
          tableName="overview_financial_capital_performance_st"
          tableData={parsePerformanceData(props.financial.performance, 'overview_financial_capital_performance_st')}
        />
      </div>
      <div className="d-inline-block">
        <EmpalaTable
          tableName="overview_financial_capital_performance_lt"
          tableData={parsePerformanceData(props.financial.performance, 'overview_financial_capital_performance_lt')}
        />
      </div>
    </div>
  </div>
);

const MapStateToProps = state => ({
  positions: state.dashboard.positions ? state.dashboard.positions : [],
  financial: state.dashboard.userData.data.financial_capital.performance ?
    state.dashboard.userData.data.financial_capital.performance :
    {
    performance: {
      '1 Week': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
      '1 Month': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
      '3 Months': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
      '6 Months': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
      '1 Year': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
      '1 Year RARR': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
      '1 Year Max DD': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
      'From start': {
        '% change': Math.random() * 100,
        'Vs indexes': Math.random() * 1000,
      },
    },
  }, // todo remove this stub later
});

export default connect(MapStateToProps)(FinancialCapitalTable);

