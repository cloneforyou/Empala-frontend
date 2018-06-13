import React, { PureComponent } from 'react';
import WidgetDotsMenu from './WidgetDotsMenu';

class WidgetHead extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const { widget } = this.props;
    return (
      <div className="widget__head">
        {
          widget.icon && <i className={`widget__icon widget__icon_${widget.icon}`} />
        }
        <h3 className="widget__title">{widget.title}</h3>
        <div className="widget__row-buttons">
          {
            widget.localFX && <button className="btn-widget-head btn-widget-head_green">Local FX</button>
          }
          {
            widget.dots && <WidgetDotsMenu />
          }

        </div>

      </div>
    );
  }
}

export default WidgetHead;
