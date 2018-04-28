import React from 'react';
import {getMenuItemsByTabName} from "../../utils/registrationUtils";
import  MdCheck from 'react-icons/lib/md/check'

const ContentMenuItems = (props) => {
  console.log('=======>', props)
  const name = props.url ? props.url.query.name : 'member';
  const menuItems = getMenuItemsByTabName(name);
  return (
    <div className='block--verticalCentered'>
      <ul className='menu-items'>
        {menuItems.map((item) => {
          const itemClassName = item.active ? 'menu-items__item menu-items__item--active' : 'menu-items__item';
          return (
            <li  key={item.key}>
              <div className="menu-items__completed-mark-wrapper">
                {item.completed && <span className="menu-items__completed-mark"><MdCheck /></span>}
              </div>
              <span className={itemClassName} > {item.title}</span>
            </li>)
        })
        }
      </ul>
    </div>
  )
};

export default ContentMenuItems;