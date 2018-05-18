import React, { Component } from 'react';
import WidgetTable from './WidgetTable';

class Widget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { widget } = this.props;
    return (
      <div className={`widget-col col-lg-${widget.col}`} key={widget.id}>
        <div className="widget" style={{ height: `${widget.height}px`}}>
          <div className="widget__head">
            {
              widget.icon && <i className={`widget__icon widget__icon_${widget.icon}`} />
            }
            <h3 className="widget__title">{widget.title}</h3>
          </div>
          <div className="widget__body">
            {
              widget.tables && widget.tables.map((table) => (
                <WidgetTable table={table} key={table.id} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Widget;