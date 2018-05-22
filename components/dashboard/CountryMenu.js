import React, { Component } from 'react';

class CountryMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { country } = this.props;
    return (
      <div className={`side-menu side-menu_${country.color}`}>
        <h3 className={`side-menu__title ${country.color}`}>{country.title}</h3>
        <ul className="side-menu__list">
          {
            country.list && country.list.length > 0 && country.list.map(item => (
              <li className="side-menu__item" key={Math.random()}>
                <a href="#">
                  <i className={`icon-flag icon-flag_${item.tag}`} />
                  <span>{item.name}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}


export default CountryMenu;
