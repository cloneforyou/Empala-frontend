import React, { Component } from 'react';

class CountryMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { country } = this.props;
    return (
      <div className={`side-menu side-menu_${country.color} side-menu_hide`}>
        <h3 className={`side-menu__title ${country.color}`}>{country.title}</h3>
        <ul className="side-menu__list">
          {
            country.list.map(item => (
              <li className="side-menu__item">
                <a href="#">
                  <i className={`icon-flag icon-flag_${item.tag}`} />
                  <span>{item.name}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default CountryMenu