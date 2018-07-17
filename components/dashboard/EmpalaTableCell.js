import React, { Component } from 'react';

export default class EmpalaTableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attr: false,
    };
  }
  componentDidMount() {
    this.dropColor();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.mark === 'numeric') {
      if (!isNaN(this.props.value) && !isNaN(nextProps.value)) {
        if (this.props.value > nextProps.value) this.setState(() => ({ attr: 'up' }));
        else if (this.props.value < nextProps.value) this.setState(() => ({ attr: 'down' }));
      }
    }
    this.dropColor();
  }
  getColorStyleByAttribute(attr) {
    if (!attr) return '';
    switch (attr) {
      case 'red':
        return 'red';
      case 'down':
        return 'emp-table__td_down red';
      case 'green':
        return 'green';
      case 'up':
        return 'emp-table__td_up green';
      default:
        return false;
    }
  }
  dropColor() {
    setTimeout(() => this.setState({ attr: false }), 500);
  }
  render() {
    return (
      <div
        id={Math.random()}
        className={`emp-table__table-cell ${this.getColorStyleByAttribute(this.state.attr)}`}
        onClick={this.props.handleClick}
      >
        {this.props.value || '--'}
      </div>
    );
  }
}
