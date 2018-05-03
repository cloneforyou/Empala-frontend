import Link from 'next/link'
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';

const MaskedRegistrationLink = (props) => (

  <li className="tabs-item">
    <Link as={`/registration/${props.name}/${props.tabNumber}`}
          href={`/registration?name=${props.name}&tabNumber=${props.tabNumber}`}>
      <a>{props.name}</a>
    </Link>
    {props.name !== 'approvals' && <IoIosArrowRight size={22}/> }
  </li>
);

const ContentMenuTabs = () => (

  <ul className='tabs-menu'>
    <MaskedRegistrationLink name='member' tabNumber='1'/>
    <MaskedRegistrationLink name='identity' tabNumber='1'/>
    <MaskedRegistrationLink name='account' tabNumber='1'/>
    <MaskedRegistrationLink name='approvals' tabNumber='1'/>
  </ul>
);

export default ContentMenuTabs