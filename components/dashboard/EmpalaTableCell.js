import React, { Component } from 'react';
import moment from 'moment/moment';

const parseDateString = (str, pattern) => {
  if (!pattern) return moment(str).format('DD-MM-YYYY');
  return moment(str).format(pattern);
};

const formatValueByType = (value, type) => {
  if (!type) return value;
  switch (type) {
    case 'date':
      return parseDateString(value);
    default: return value;
  }
};

export default class EmpalaTableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attr: '',
      // value: this.props.value,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.mark === 'numeric') {
      // console.log('mmmmmmmmm', this.props.mark, nextProps);
      if (!isNaN(this.props.value) && !isNaN(nextProps.value)) {
        if (this.props.value < nextProps.value) this.setState(() => ({ attr: 'up' }));
        else if (this.props.value > nextProps.value) this.setState(() => ({ attr: 'down' }));
        // else if (this.props.value === nextProps.value) this.setState(() => ({ attr: '' }));
      }
    }
    // this.dropColor();
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
    setTimeout(() => this.setState({ attr: false }), 1000);
  }
  render() {
    // this.dropColor();
    return (
      <div
        className={
          `
          ${this.getColorStyleByAttribute(this.state.attr)}
          ${this.props.small && 'emp-table__table-cell_small'}
          ${this.props.bold && 'emp-table__table-cell_text-bold'}
          ${this.getColorStyleByAttribute(this.props.color)} text-truncate`
        }
        onClick={this.props.handleClick}
      >
        {(this.props.value || this.props.value === 0) ?
          formatValueByType(this.props.value, this.props.type) :
          '--'}
      </div>
    );
  }
}
