import React, { Component } from 'react';
import Table from './Table';
import WidgetHead from './WidgetHead';

class WidgetTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget, overview } = this.props;
    return (
      <div
        className={`widget-col  ${overview ? `d-inline-block widget-col_${widget.col}` : `col ${widget.col_md && `col-md-${widget.col_md}`} col-xl-${widget.col}`}`}
        key={widget.id}
      >
        <div className="widget" style={{ maxHeight: `${widget.height}px` }}>
          <WidgetHead widget={widget} />
          <div className="widget__body">
            {
              widget.title === 'Environmental capital' ?
                <div className="row no-gutters">
                  <div className="col-md-6">
                    {
                      widget.tables && widget.tables.map((table) => {
                        if (table.group === 1)
                          return (
                            <Table overview={overview} table={table} key={table.id} />
                          )
                      })
                    }
                  </div>
                  <div className="col-md-6">
                    {
                      widget.tables && widget.tables.map((table) => {
                        if (table.group === 2)
                          return (
                            <Table overview={overview} table={table} key={table.id} />
                          )
                      })
                    }
                  </div>
                </div> :
                widget.tables && widget.tables.map(table => (
                  <Table overview={overview} table={table} key={table.id} />
                ))
            }

          </div>
        </div>
      </div>
    );
  }
}

export default WidgetTable;
