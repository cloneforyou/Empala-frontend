import React from 'react';
import {getMenuItemsByPageName} from "../utils/registrationUtils";

const RegistrationContentMenuItems = (props) => {
  const menuItems = getMenuItemsByPageName(props.name);
  return (
    <div className=''>
      <ul className=''>
        {menuItems.map((item) => {
          return (
            <li key={item.key}>
              {item.title}
            </li>)
        })
        }
      </ul>
    </div>
  )
};

export default RegistrationContentMenuItems;