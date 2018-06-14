import React, { PureComponent } from 'react';
import WidgetDotsMenu from './WidgetDotsMenu';

class WidgetHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fxButtonContent: 'Local',
      rangeInputFrom: 0,
      rangeInputTo: 0,
    }
  }

  toggleFX = () => {
    this.setState((prevState) => {
      return { fxButtonContent: prevState.fxButtonContent === 'Local' ? 'Active' : 'Local' };
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }


  render() {
    const { widget } = this.props;
    const { fxButtonContent, rangeInputFrom, rangeInputTo } = this.state;
    return (
      <div className="widget__head">
        <div className="widget__title-row">
          {
            widget.icon && <i className={`widget__icon widget__icon_${widget.icon}`} />
          }
          <h3 className="widget__title">{widget.title}</h3>
        </div>
        <div className="widget__row-buttons">
          {
            widget.assetAmountRange &&
            <div className="form-range">
              <span className="form-range__label mr-2">Asset amount range</span>
              <input
                className="form-range__input mr-2"
                type="number"
                id="rangeInputFrom"
                onChange={this.handleChange}
                value={rangeInputFrom}
              />
              <span className="form-range__label mr-2">to</span>
              <input
                className="form-range__input mr-2"
                type="number"
                id="rangeInputTo"
                onChange={this.handleChange}
                value={rangeInputTo}
              />
              <button className="btn-widget-head btn-widget-head_green">Reset</button>
            </div>
          }
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
