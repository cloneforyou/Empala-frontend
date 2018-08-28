import React, { Component } from 'react';


class CardMenu extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideBackground);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutsideBackground);
  }

  handleClickOutsideBackground = event => {
    console.log('this.cardMenu.contains(event.target)', this.cardMenu.contains(event.target));
    if (!this.cardMenu.contains(event.target)) {
      this.props.handleClickOnCardMenu();
    }
  };

  render() {
    return (
      <div ref={node => this.cardMenu = node}>
        <button className="btn-complete" onClick={this.props.handleClickOnCompleteAction}>Mark as complete</button>
      </div>
    );
  }
}

export default CardMenu;