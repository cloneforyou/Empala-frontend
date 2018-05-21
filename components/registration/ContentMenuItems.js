import React from 'react';

const ContentMenuItems = (props) => {

  return (
    <ul className="menu-items">
      {props.menuItems.map((item, index) => {
        const itemClassName = (props.tabIndex === index + 1) ? 'menu-items__item menu-items__item_active' : 'menu-items__item';
        return (
          <li className={itemClassName} key={item.key}>
            <span>{item.title}</span>
          </li>
        );
      })
      }
    </ul>
  );
};

export default ContentMenuItems;