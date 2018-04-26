import React from 'react';
import {getMenuItemsByPageName} from "../utils/registrationUtils";

const RegistrationContentMenuItems = (props) => {
  const menuItems = getMenuItemsByPageName(props.name);
  return (
    <div className=''>
      <ul className='menu-items'>
        {menuItems.map((item) => {
          const itemClassName = item.active ? 'menu-items__item menu-items__item--active' : 'menu-items__item';
          return (
            <li  key={item.key}>
              <span className={itemClassName} > {item.title}</span>
            </li>)
        })
        }
      </ul>
    </div>
  )
};

export default RegistrationContentMenuItems;