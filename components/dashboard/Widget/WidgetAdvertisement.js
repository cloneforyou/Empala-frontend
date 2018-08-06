import React, { Component } from 'react';

class WidgetAdvertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = () => {
    const { menuIsOpen } = this.state;
    this.setState({ menuIsOpen: !menuIsOpen });
  }

  render() {
    const { menuIsOpen } = this.state;
    return (
      <div
        className="widget-col widget-col_4"
        style={{ maxWidth: '593px' }}
      >
        <div className="widget widget_padding" style={{ height: '365px' }}>
          <div className="widget__head">
            <h3 className="widget__title">Advertisements and Information</h3>
            <div className="widget-menu">
              <button className="widget-menu__btn" onClick={this.toggleMenu} />
              <ul className={menuIsOpen ?
                'dropdown-menu dropdown-menu-right show widget-menu__list' :
                'dropdown-menu dropdown-menu-right  widget-menu__list'
              }
              >
                <li className="dropdown-item widget-menu__item"><a href="#">Link 1</a></li>
                <li className="dropdown-item widget-menu__item"><a href="#">Link 2</a></li>
                <li className="dropdown-item widget-menu__item"><a href="#">Link 3</a></li>
              </ul>
            </div>
          </div>
          <div className="widget-adv-img">
            <img className="" src="../../static/images/widgetAdv.jpg" alt="" />
          </div>
        </div>
      </div>
    )
  }

}

export default WidgetAdvertisement;