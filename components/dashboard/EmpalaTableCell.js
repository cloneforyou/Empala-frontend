import React, { Component } from 'react';

export default class EmpalaTableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attr: '',
      // value: this.props.value,
    };
  }
  componentDidMount() {
    console.log('mounted!')
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log('pppppppppppppprrrrrr', nextProps, prevState)
  //   if (nextProps.mark === 'numeric') {
  //     console.log('NNNNNAAANNNA', isNaN(prevState.value), isNaN(nextProps.value) )
  //     if (!isNaN(prevState.value) && !isNaN(nextProps.value)) {
  //       console.log('mmmmmmmmm', nextProps.mark, prevState.value === nextProps.value, nextProps.value, prevState.value);
  //       if (nextProps.value > prevState.value) return { attr: 'up', value: nextProps.value };
  //       else if (nextProps.value < prevState.value) return { attr: 'down', value: nextProps.value };
  //       return { attr: '', value: nextProps.value };
  //     }
  //     return false;
  //   }
  // }
  // componentDidUpdate(prevProps) {
  //   console.log('pppppppppppppprrrrrr===>', prevProps)
  //   if (prevProps.mark === 'numeric') {
  //     if (!isNaN(this.props.value) && !isNaN(prevProps.value)) {
  //       console.log('mmmmmmmmm', prevProps.mark, this.props);
  //       if (this.props.value > prevProps.value) this.setState(() => ({ attr: 'up' }));
  //       else if (this.props.value < prevProps.value) this.setState(() => ({ attr: 'down' }));
  //     }
  //   }
  // }
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
        className={`emp-table__table-cell ${this.getColorStyleByAttribute(this.state.attr)}
         ${this.getColorStyleByAttribute(this.props.color)} text-truncate`}
        onClick={this.props.handleClick}
      >
        {this.props.value || '--'}
      </div>
    );
  }
}
