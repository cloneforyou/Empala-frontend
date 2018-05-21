import React, { Component } from 'react';
import Table from './Table';

class WidgetTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget } = this.props;
    return (
      <div className={`widget-col col-lg-${widget.col}`} key={widget.id}>
        <div className="widget" style={{ maxHeight: `${widget.height}px` }}>
          <div className="widget__head">
            {
              widget.icon && <i className={`widget__icon widget__icon_${widget.icon}`} />
            }
            <h3 className="widget__title">{widget.title}</h3>
          </div>
          <div className="widget__body">
            {
              widget.title === 'Environmental capital' ?
                <div className="row no-gutters">
                  <div className="col-md-6">
                    {
                      widget.tables && widget.tables.map((table) => {
                        if (table.group === 1)
                          return (
                            <Table table={table} key={table.id} />
                          )
                      })
                    }
                  </div>
                  <div className="col-md-6">
                    {
                      widget.tables && widget.tables.map((table) => {
                        if (table.group === 2)
                          return (
                            <Table table={table} key={table.id} />
                          )
                      })
                    }
                  </div>
                </div> :
                widget.tables && widget.tables.map((table) => (
                  <Table table={table} key={table.id} />
                ))
            }

          </div>
        </div>
      </div>
    );
  }
}

export default WidgetTable;
