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
    this.widget = getTableHeaderByName(this.props.tableName);
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
    if (!order) return data;
    return data.sort((a, b) => {
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
  innerHeight(height) {
    if (height) return `${height - 40}px`;
    return 'auto';
  }
  render() {
    const { widget } = this;
    const { sortDirection, sortColIndex } = this.state;
    const tableData = this.sortByColumn(this.props.tableData, sortColIndex, sortDirection);
    return (
      <div style={{ overflowY: 'scroll', maxHeight: this.innerHeight(widget.height) }} >
        <ul
          className="d-flex flex-row no-gutters list-unstyled "
          style={{ overflowX: 'scroll' }}
        >
          {widget.headers.map((header, index) => (
            <li
              className={`col-auto ${this.props.striped && 'emp-table table-striped-row'}`}
              key={header}
              style={{ width: widget.attrs.width[index] || 'auto' }}
            >
              <div
                id={`col${index}`}
                className="emp-table__th"
                onClick={(widget.attrs.sortable && widget.attrs.sortable[index]) ?
                  (e => (this.props.callbacks && this.props.callbacks[index] ?
                    widget.callbacks[index](e) :
                    this.setSortType(index)))
                  : undefined}
                style={{ cursor: widget.attrs.sortable && widget.attrs.sortable[index] ? 'pointer' : '' }}
              >{header}
                {widget.attrs.sortable && widget.attrs.sortable[index] && <i className="icon-sort" />}
              </div>
              <div>{tableData.map((row, i) => (
                <EmpalaTableCell
                  key={`${header}-${i}`}
                  handleClick={row[index] ? row[index].onclick : undefined}
                  value={row[index] && row[index].value}
                  mark={row[index] && row[index].mark}
                  color={row[index] && row[index].color}
                />
                  ))}
              </div>
            </li>
              ))}
        </ul>
      </div>
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
