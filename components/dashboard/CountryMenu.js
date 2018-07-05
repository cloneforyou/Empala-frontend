import React, { Component } from 'react';
import { connect } from 'react-redux';

class CountryMenu extends Component {
  render() {
    const { country, currentColorScheme, selectMarket } = this.props;
    return (
      <div className={`side-menu side-menu_${currentColorScheme} side-menu_${country.color}`}>
        <h3 className={`side-menu__title ${country.color}`}>{country.title}</h3>
        <ul className="side-menu__list">
          {
            country.list && country.list.length > 0 && country.list.map(item => (
              <li className="side-menu__item" key={Math.random()}>
                <a href="#" onClick={(e) => {e.stopPropagation();selectMarket('market')}}>
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

export default connect(state => ({
  currentColorScheme: state.dashboard.currentColorScheme,
}))(CountryMenu);
