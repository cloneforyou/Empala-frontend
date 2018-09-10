import React, { Component } from 'react';

class AssetAmountRange extends Component {
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  resetValues = () => {
    this.props.resetRange(this.props.widgetName)
  }

  render() {
    return (
      <div className="form-range">
        <span className="form-range__label mr-2">Asset amount range</span>
        <input
          className="form-range__input mr-2"
          type="number"
          id={`${this.props.widgetName}_rangeInputFrom`}
          onChange={this.props.setInputValueById}
          value={this.props.assetsRangeFrom}
        />
        <span className="form-range__label mr-2">to</span>
        <input
          className="form-range__input mr-2"
          type="number"
          id={`${this.props.widgetName}_rangeInputTo`}
          onChange={this.props.setInputValueById}
          value={this.props.assetsRangeTo}
        />
        <button
          className="btn-widget-head btn-widget-head_green"
          onClick={this.resetValues}
        >
          Reset
        </button>
      </div>
    )
  }
};
export default AssetAmountRange;