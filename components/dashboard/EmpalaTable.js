import React, { Component } from 'react';
import WidgetHead from './Widget/WidgetHead';
import { getTableHeaderByName } from '../../utils/dashboardUtils';

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

  render() {
    const widget = getTableHeaderByName(this.props.tableName);
    const { sortDirection, sortColIndex } = this.state;
    console.log('dddddddaaaaatttttaaa', this.props.tableData);
    const Data = this.props.tableData || [
      [{ value: '123' }, { value: 'dfsfdsf' }, { value: '66' }, { value: '123', onclick: e => console.log('clicked', e.target) }, , , { value: 'sdfdsfsdfsdf' }],
      [{ value: '123' }, { value: 'aaadfsfdsf' }, { value: '566' }, { value: '223', onclick: e => console.log('clicked', e.target) }, , , { value: 'dsffdfdsfsdfsdf' }],
    ];
    const tableData = this.sortByColumn(Data, sortColIndex, sortDirection);
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
          <ul className="d-flex flex-row list-unstyled">
            {widget.headers.map((header, index) => (
              <li
                className="col-auto"
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
                  <div
                    id={Math.random()}
                    className="emp-table__table-cell"
                    onClick={row[index] ? row[index].onclick : null}
                  >
                    {row[index] ? row[index].value : '--'}
                  </div>
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


export default EmpalaTable;
