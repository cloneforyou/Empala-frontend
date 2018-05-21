import React from 'react';
import { withReduxSaga } from '../../store';
import { setTabName, setTabPageIndex } from '../../actions/registration';

const ContentMenuTabs = (props) => {
  const handleClick = (name) => {
    props.dispatch(setTabName(name));
    props.dispatch(setTabPageIndex(1));
  };
  return (
    <ul className="tabs-menu">
      <li className={props.tabName === 'member' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('member')}>Member</span>
      </li>
      <li className={props.tabName === 'identity' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('identity')}>Identity</span>
      </li>
      <li className={props.tabName === 'regulatory' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('regulatory')}>Regulatory</span>
      </li>
      <li className={props.tabName === 'profile' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('profile')}>Profile</span>
      </li>
      <li className={props.tabName === 'experience' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('experience')}>Experience</span>
      </li>
    </ul>
  )
};

export default withReduxSaga(ContentMenuTabs)