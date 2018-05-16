import React from 'react';
import { getMenuItemsByTabName } from "../../utils/registrationUtils";
import  IoCheckmarkRound from 'react-icons/lib/io/checkmark-round'

const ContentMenuItems = (props) => {
  console.log('MMMMMMMMMMEEEEENNNNUUUUU', props)
  // const name = props.url ? props.url.query.name : 'member';
  // const menuItems = getMenuItemsByTabName(name);
  return (
      <ul className='menu-items'>
        {props.menuItems.map((item, index) => {
          const itemClassName = (props.tabIndex === index+1) ? 'menu-items__item menu-items__item_active' : 'menu-items__item';
          return (
            <li className={itemClassName}  key={item.key}>
              {/*<div className="menu-items__completed-mark-wrapper">*/}
                {/*{item.completed && <div className='menu-items__completed-mark'><IoCheckmarkRound size={10} /></div>}*/}
              {/*</div>*/}
              <span>{item.title}</span>
            </li>)
        })
        }
      </ul>
  )
};

export default ContentMenuItems;