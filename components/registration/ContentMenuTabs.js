import Link from 'next/link'
import { withReduxSaga } from "../../store";
import {setTabName, setTabPageIndex} from "../../actions/registration";

const MaskedRegistrationLink = (props) => (
  <li className="breadcrumb-item">
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
  <div className='menu-tabs'>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-transparent justify-content-center">
        {/*<MaskedRegistrationLink name='member' tabNumber='1'/>*/}
        {/*<MaskedRegistrationLink name='identity' tabNumber='1'/>*/}
        {/*<MaskedRegistrationLink name='account' tabNumber='1'/>*/}
        {/*<MaskedRegistrationLink name='approvals' tabNumber='1'/>*/}
        <li className="breadcrumb-item" onClick={() => handleClick('member')}>member</li>
        <li className="breadcrumb-item" onClick={() => handleClick('identity')}>identity</li>
        <li className="breadcrumb-item" onClick={() => handleClick('account')}>account</li>
        <li className="breadcrumb-item" onClick={() => handleClick('approvals')}>approvals</li>
      </ol>
    </nav>

  </div>
  )
};

export default withReduxSaga(ContentMenuTabs)