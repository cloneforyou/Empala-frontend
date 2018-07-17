import React, { Component } from 'react';
import WidgetHead from './Widget/WidgetHead';
import { getTableHeaderByName } from '../../utils/dashboardUtils';
import EmpalaTableCell from './EmpalaTableCell';

/* ======== EMPALA TABLE ======== */
/* Draws a table based on several arrays provided as props

*       tableData = [{
*         value: string/number,
*         mark: enum('numeric', 'status'),
*         }]
*
*         callbacks = [] - callbacks array for click on headers.
*         Default is sort by column value.
/* =============================== */

class EmpalaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: false,
      sortColIndex: false,
    };
  }

  setSortType(index) {
    this.setState(state => ({
      sortDirection: (() => {
        if (!state.sortDirection) return 'asc';
        return state.sortDirection === 'asc' ? 'desc' : 'asc';
      })(),
      sortColIndex: index,
    }
    ));
  }

  sortByColumn(data, col, order) {
    return data.sort((a, b) => {
      if (!order) return data;
      if (!a[col]) return 1;
      if (!b[col]) return -1;
      if (a[col].value === b[col].value) return 0;
      if (order === 'asc') {
        if (!isNaN(a[col].value) && !isNaN(b[col].value)) return a[col].value - b[col].value;
        if (a[col].value > b[col].value) return 1;
        if (a[col].value < b[col].value) return -1;
      }
      if (order === 'desc') {
        if (!isNaN(a[col].value) && !isNaN(b[col].value)) return b[col].value - a[col].value;
        if (a[col].value > b[col].value) return -1;
        if (a[col].value < b[col].value) return 1;
      }
      return false;
    });
  }
  getColorStyleByAttribute(attr) {
    if (!attr) return '';
    switch (attr) {
      case 'red':
        return 'red';
      case 'down':
        return 'emp-table__td_down red';
      case 'green':
        return 'green';
      case 'up':
        return 'emp-table__td_up green';
      default:
        return false;
    }
  }
  render() {
    const widget = getTableHeaderByName(this.props.tableName);
    const { sortDirection, sortColIndex } = this.state;
    const tableData = this.sortByColumn(this.props.tableData, sortColIndex, sortDirection);
    return (
      <div
        className={`widget-col col-lg-${widget.col}`}
        key={widget.id}
      >
        <div className="widget" style={{ maxHeight: `${widget.height}px` }}>
          <WidgetHead
            widget={widget}
          />
          {/* <div className="row"> */}
          <ul className="d-flex flex-row no-gutters list-unstyled">
            {widget.headers.map((header, index) => (
              <li
                className={`col-auto ${this.props.striped && 'emp-table table-striped-row'}`}
                key={header}
                style={{ width: widget.attrs.width[index] || 'auto' }}
              >
                <div
                  id={`col${index}`}
                  className="emp-table__th"
                  onClick={e => (this.props.callbacks && this.props.callbacks[index] ? widget.callbacks[index](e) : this.setSortType(index))}
                  style={{ cursor: 'pointer' }}
                >{header}
                </div>
                <div>{tableData.map(row => (
                  /*<div
                    id={Math.random()}
                    className={`emp-table__table-cell ${row[index] && this.getColorStyleByAttribute(row[index].attr)}`}
                    onClick={row[index] ? row[index].onclick : null}
                  >
                    {row[index] ? row[index].value || '--' : '--'}
                  </div>*/
                  <EmpalaTableCell
                    key={Math.random()}
                    handleClick={row[index] ? row[index].onclick : null}
                    value={row[index] && row[index].value}
                    mark={row[index] && row[index].mark}
                      />
                  ))}
                </div>
              </li>
              ))}
          </ul>
        </div>
        <div className="table table-striped emp-table" />
      </div>
    // </div>
    );
  }
}

EmpalaTable.defaultProps = {
  tableName: 'EmpalaTable',
  tableData: [],
  callbacks: [],
  striped: false,
};

export default EmpalaTable;
