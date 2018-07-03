import React, { Component } from 'react';
import { values } from 'lodash';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { table } = this.props;
    console.log('table.data -==> ', table.data);
    return (
      <div className="table-responsive">
        <table className="table table-borderless table-striped emp-table">
          <thead>
            <tr className="emp-table__tr">
              {table.headers.map((header, i) => (
                <th
                  scope="col"
                  className="emp-table__th"
                  key={Math.random()}
                  style={{ width: header.width || 'auto' }}
                >
                  {header.title}
                </th>
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
                      if (row.status && row.status === item) {
                        return (
                          <td
                            className={item !== 'Active' ? item !== 'Action' ? 'emp-table__td' : 'emp-table__td red' : 'emp-table__td green'}
                            key={Math.random()}
                          >{item}
                          </td>
                        );
                      } else if (row.dayChg && row.dayChg.data === item.data) {
                        return (
                          <td
                            className={item.position !== 'up' ? item.position !== 'down' ?
                              'emp-table__td' :
                              'emp-table__td_down  emp-table__td red' :
                              'emp-table__td_up  emp-table__td green'
                            }
                            key={Math.random()}
                          >{item.data}
                          </td>
                        );
                      } else if (row.chart && row.chart === item) {
                        return (
                          <td className="emp-table__td emp-table__td_chart" key={Math.random()}>
                            <img src={`../../static/images/${item}`} alt="" />
                          </td>
                        );
                      }
                        return (
                          <td
                            className="emp-table__td"
                            key={Math.random()}
                            style={{ widht: item.width || 'auto' }}
                          >
                            {item}
                          </td>
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

export default Table;
