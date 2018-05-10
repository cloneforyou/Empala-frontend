// import Link from 'next/link'
import React from 'react';
import { withReduxSaga } from '../../store';
import { setTabName, setTabPageIndex } from '../../actions/registration';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';

// const MaskedRegistrationLink = (props) => (
//   <li className="tabs-item">
//     <Link as={`/registration/${props.name}/${props.tabNumber}`}
//           href={`/registration?name=${props.name}&tabNumber=${props.tabNumber}`}>
//       <a>{props.name}</a>
//     </Link>
//   </li>
// );

const ContentMenuTabs = (props) => {
  const handleClick = (name) => {
    props.dispatch(setTabName(name));
    props.dispatch(setTabPageIndex(1));
  };
  return (
    <ul className='tabs-menu'>
      {/*<MaskedRegistrationLink name='member' tabNumber='1'/>*/}
      {/*<MaskedRegistrationLink name='identity' tabNumber='1'/>*/}
      {/*<MaskedRegistrationLink name='account' tabNumber='1'/>*/}
      {/*<MaskedRegistrationLink name='approvals' tabNumber='1'/>*/}
      <li className={props.tabName === 'member' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('member')}>Member</span>
        {/*<IoIosArrowRight size={22}/>*/}
      </li>
      <li className={props.tabName === 'identity' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('identity')}>Identity</span>
        {/*<IoIosArrowRight size={22}/>*/}
      </li>
      <li className={props.tabName === 'regulatory' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('regulatory')}>Regulatory</span>
        {/*<IoIosArrowRight size={22}/>*/}
      </li>
      <li className={props.tabName === 'profile' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('profile')}>Profile</span>
        {/*<IoIosArrowRight size={22}/>*/}
      </li>
      <li className={props.tabName === 'experience' ? 'tabs-menu__item tabs-menu__item_active' : 'tabs-menu__item'}>
        <span onClick={() => handleClick('experience')}>Experience</span>
      </li>
    </ul>
  )
};

export default withReduxSaga(ContentMenuTabs)