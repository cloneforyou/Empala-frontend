import React from 'react';
import { connect } from 'react-redux';
import { reduce, uniqueId } from 'lodash';
import { widgetsPositionFirst } from '../../../localdata/dashboardWidgets';
import WidgetTable from './WidgetTable';

const parsePositionsTablesData = (tables, data) => {
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
      net: calculateDomesticByType(),
      stocks: calculateDomesticByType('CommonStock'),
    };
    const foreign = {
      net: 0,
      stocks: 0,
    };
    return tables.map((table, index) => {
      if (index === 0) {
        return {
          ...table,
          data: [
            {
              id: uniqueId(),
              exposure: 'Net value',
              domestic: domestic.net,
              foreign: foreign.net,
              total: foreign.net + domestic.net,
              dayChange: 999.9,
            },
            {
              id: uniqueId(),
              exposure: 'Stoks',
              domestic: domestic.stocks,
              foreign: foreign.stocks,
              total: 0,
              dayChange: 999.9,
            },
          ],
        };
      }
      return table;
    });
  }
  return [];
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
