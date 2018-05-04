import Link from 'next/link'
import { withReduxSaga } from "../../store";
import {setTabName, setTabPageIndex} from "../../actions/registration";
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';

const MaskedRegistrationLink = (props) => (
  <li className="tabs-item">
    <Link as={`/registration/${props.name}/${props.tabNumber}`}
          href={`/registration?name=${props.name}&tabNumber=${props.tabNumber}`}>
      <a>{props.name}</a>
    </Link>
  </li>
);

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
        <li className="tabs-item" onClick={() => handleClick('member')}>Member <IoIosArrowRight size={22}/></li>
        <li className="tabs-item" onClick={() => handleClick('identity')}>Identity <IoIosArrowRight size={22}/></li>
        <li className="tabs-item" onClick={() => handleClick('account')}>Account <IoIosArrowRight size={22}/></li>
        <li className="tabs-item" onClick={() => handleClick('approvals')}>Approvals</li>
      </ul>
  )
};

export default withReduxSaga(ContentMenuTabs)