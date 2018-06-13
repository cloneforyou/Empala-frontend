import React, { PureComponent } from 'react';

class WidgetDotsMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = () => {
    const { menuIsOpen } = this.state;
    this.setState({ menuIsOpen: !menuIsOpen });
  };

  render() {
    const { menuIsOpen } = this.state;
    return (
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
    );
  }
}

export default WidgetDotsMenu;
