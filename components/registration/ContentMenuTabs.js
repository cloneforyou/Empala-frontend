// import Link from 'next/link'
import React from 'react';
import { withReduxSaga } from '../../store';
import {setTabName, setTabPageIndex} from '../../actions/registration';
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
        <li>
          <span
            className={props.tabName === 'member' ? "tabs-item tabs-item--active" : "tabs-item"}
            onClick={() => handleClick('member')}
          >Member</span>
          <IoIosArrowRight size={22}/></li>
        <li>
          <span
            className={props.tabName === 'identity' ? "tabs-item tabs-item--active" : "tabs-item"}
            onClick={() => handleClick('identity')}
          >Identity</span>
          <IoIosArrowRight size={22}/></li>
        <li>
          <span
            className={props.tabName === 'regulatory' ? "tabs-item tabs-item--active" : "tabs-item"}
            onClick={() => handleClick('regulatory')}
          >Regulatory</span>
          <IoIosArrowRight size={22}/></li>
        <li><span
          className={props.tabName === 'profile' ? "tabs-item tabs-item--active" : "tabs-item"}
          onClick={() => handleClick('profile')}
        >Profile</span>
          <IoIosArrowRight size={22}/></li>
        <li><span
          className={props.tabName === 'experience' ? "tabs-item tabs-item--active" : "tabs-item"}
          onClick={() => handleClick('experience')}
        >Experience</span></li>
      </ul>
  )
};

export default withReduxSaga(ContentMenuTabs)