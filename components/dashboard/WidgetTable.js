import React, { Component } from 'react';
import { connect } from 'react-redux';

class WidgetTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { table } = this.props;
    return (
      <div>
        <table className="table table-borderless">
          <thead>
            <tr>
              {table.headers.map((header, j) => (
                <th scope="col" className={`text-${header.align}`}>{header.title}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total a/c value</td>
              <td>9,999,999,999</td>
              <td>999.9</td>
              <td>EMARA & MM</td>
              <td>9,999,999,999</td>
              <td>9,999,999,999</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WidgetTable;
