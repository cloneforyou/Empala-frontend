import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
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
*         small: bool - table cells without vertical padding
*           default - false.
*         hideHeader: bool - show or hide table header
/* =============================== */

const datePatterns = [
  'DD.MM.YYYY',
  'DD-MM-YYYY',
  'DD/MM/YYYY',
];
class EmpalaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: false,
      sortColIndex: false,
    };
    this.table = getTableHeaderByName(this.props.tableName);
    this.callbacks = this.table.attrs.callbacks || this.props.callbacks;
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
      /* Sorting by date function. Now put raw value to cell, so date fields sorded */
      /* as strings. Maybe later we'll have to redesign that. */
      // if (a[col].type === 'date' && b[col].type === 'date') {
      //   if (moment(a[col].value, datePatterns).isValid() &&
      //     moment(b[col].value, datePatterns).isValid()) {
      //     const dateA = moment(a[col].value, datePatterns);
      //     const dateB = moment(b[col].value, datePatterns);
      //     if (order === 'asc') return (dateA > dateB) ? 1 : -1;
      //     if (order === 'desc') return (dateA > dateB) ? -1 : 1;
      //   }
      // }
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
    if (height) return `${height}px`;
    return 'auto';
  }
  getDividerWidth(colWidth) {
    const width = parseInt(colWidth, 10);
    return /%/.test(colWidth) ?
      `${(100 / width) * 100}%` :
      'auto';
  }

  renderThumbHorizontal = (props) => {
    return (
      <div {...props} className="widget__scroll-block-thumb-horizontal" />
    );
  };

  renderThumbVertical = (props) => {
    return (
      <div {...props} className="widget__scroll-block-thumb-vertical" />
    );
  };

  render() {
    const { table, callbacks } = this;
    const sortDirection = this.props.tableSortDirection || this.state.sortDirection;
    const sortColIndex = this.props.tableSortIndex || this.state.sortColIndex;
    const tableData = this.props.sortExternal ?
      this.props.tableData :
      this.sortByColumn(this.props.tableData, sortColIndex, sortDirection);
    return (
      <Scrollbars
        className="widget__scroll-block"
        style={{height: this.innerHeight(table.height)}}
        renderThumbVertical={this.renderThumbVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        autoHeightMin={this.innerHeight(table.height)}
        autoHeightMax={this.innerHeight(table.height)}
        autoHeight
        universal
      >
        <ul
          className="d-flex flex-row no-gutters list-unstyled"
          style={{margin: 0, paddingRight: '9px'}}
        >
          {table.headers.map((header, index) => (
            <li
              className={`col-auto ${this.props.striped && 'emp-table table-striped-row'}`}
              key={header}
              style={{
                width: table.attrs.width[index] || 'auto',
                minWidth: '45px',
                textAlign: table.attrs.align && table.attrs.align[index],
                padding: table.attrs.padding && table.attrs.padding[index],

              }}
            >
              {!this.props.hideHeader &&
              <div
                id={`col${index}`}
                className="emp-table__th"
                onClick={(table.attrs.sortable && table.attrs.sortable[index]) ?
                  (e => (callbacks && callbacks[index] ?
                    callbacks[index](e, this.props.tableName, index, sortDirection) :
                    this.setSortType(index)))
                  : undefined}
                style={{
                  cursor: table.attrs.sortable && table.attrs.sortable[index] ? 'pointer' : '',
                  fontSize: this.props.headerSmall && '10px',
                }}
              >{header}
                {table.attrs.sortable && table.attrs.sortable[index] && <i className="icon-sort"/>}
              </div>
              }
              <div>{tableData.map((row, i) => (
                (this.props.leagueDividerShow && this.props.dividerIndex && i === this.props.dividerIndex) ?
                  <div
                    key="divider"
                    className="emp-table__divider"
                    onClick={this.props.toggleLeagueDivider}
                    role="button"
                  >{index === 4 ? '. . .' : ''}
                  </div> :
                  <div
                    key={`${header}-${i}`}
                    className={`emp-table__table-cell
                        ${this.props.small && 'emp-table__table-cell_small'}
                        ${
                      this.props.leagueDividerShow
                      && this.props.dividerEndIndex
                      && i > this.props.dividerIndex
                      && (i < this.props.dividerEndIndex || i > this.props.dividerEndIndex + 5)
                        ? 'd-none' : ''
                      }`}
                  >
                    <EmpalaTableCell
                      handleClick={row[index] ? row[index].onclick : undefined}
                      value={row[index] && row[index].value}
                      type={row[index] && row[index].type}
                      mark={row[index] && row[index].mark}
                      bold={row[index] && row[index].bold}
                      color={row[index] && row[index].color}
                    />
                  </div>
              ))}
              </div>
            </li>
          ))}
        </ul>
      </Scrollbars>
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
