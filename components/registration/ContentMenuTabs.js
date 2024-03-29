import React from 'react';
import PropTypes from 'prop-types';
import { origin } from '../../keys';

import { withReduxSaga } from '../../store';
import { setTabName, setTabPageIndex } from '../../actions/registration';

const ContentMenuTabs = (props) => {
  const handleClick = (name) => {
    if (origin !== 'dev') return;
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
    </ul>
  );
};

ContentMenuTabs.propTypes = {
  tabName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withReduxSaga(ContentMenuTabs);
