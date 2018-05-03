import React from 'react';
import {getMenuItemsByTabName} from "../../utils/registrationUtils";
import  IoCheckmarkRound from 'react-icons/lib/io/checkmark-round'

const ContentMenuItems = (props) => {
  const name = props.url ? props.url.query.name : 'member';
  const menuItems = getMenuItemsByTabName(name);

  return (
      <ul className='menu-items'>
        {menuItems.map((item) => {
          const itemClassName = item.active ? 'menu-items__item menu-items__item--active' : 'menu-items__item';
          return (
            <li  key={item.key}>
              <div className="menu-items__completed-mark-wrapper">
                {item.completed && <div className='menu-items__completed-mark'><IoCheckmarkRound size={10} /></div>}
              </div>
              <span className={itemClassName} > {item.title}</span>
            </li>)
        })
        }
      </ul>
  )
};

export default ContentMenuItems;