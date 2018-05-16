import React, { Component } from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';

class WidgetTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { table } = this.props;
    return (
      <div>
        <table className="table table-borderless emp-table">
          <thead>
            <tr>
              {table.headers.map((header, i) => (
                <th scope="col" className={`emp-table__th`} key={i}>{header.title}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {
            table.data && table.data.length > 0 && table.data.map((row, i) => (
              <tr key={row.id} className="emp-table__tr">
                {
                  values(row).map((item, index) => {
                    if (index > 0) {
                      return (
                        <td className="emp-table__td">{item}</td>
                      );
                    }
                  })
                }
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default WidgetTable;
