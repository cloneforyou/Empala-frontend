import React, { Component } from 'react';

class AssetAmountRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeInputFrom: 0,
      rangeInputTo: 0,
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  resetValues = () => {
    this.setState({
      rangeInputFrom: 0,
      rangeInputTo: 0,
    })
  }

  render() {
    const { rangeInputFrom, rangeInputTo } = this.state;
    return (
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