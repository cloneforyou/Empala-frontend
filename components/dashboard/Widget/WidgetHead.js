import React, { PureComponent } from 'react';
import WidgetDotsMenu from './WidgetDotsMenu';
import AssetAmountRange from './AssetAmountRange';
import Switcher from './Switcher';

class WidgetHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fxButtonContent: 'Local',
    }
  }

  toggleFX = () => {
    this.setState((prevState) => {
      return { fxButtonContent: prevState.fxButtonContent === 'Local' ? 'Active' : 'Local' };
    })
  }


  render() {
    const { widget } = this.props;
    const { fxButtonContent } = this.state;
    return (
      <div className="widget__head">
        <div className="widget__title-row">
          {
            widget.icon && <i className={`widget__icon widget__icon_${widget.icon}`} />
          }
          <h3 className="widget__title">{widget.title}</h3>
        </div>
        <div className="widget__row-buttons">
          {widget.assetAmountRange && <AssetAmountRange />
          }
          {widget.switcher && <Switcher />}
          {
            widget.localFX &&
            <button
              className="btn-widget-head btn-widget-head_green"
              onClick={this.toggleFX}
            >{fxButtonContent} FX</button>
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
