import React from 'react';
import {getMenuItemsByPageName} from "../utils/registrationUtils";

const ContentMenuItems = (props) => {
  console.log('=======>', props)
  const name = props.url ? props.url.query.name : 'member';
  const menuItems = getMenuItemsByPageName(name);
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

export default ContentMenuItems;