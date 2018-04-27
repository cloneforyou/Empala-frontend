import Link from 'next/link'

const MaskedRegistrationLink = (props) => (
  <li className="breadcrumb-item">
    <Link as={`/registration/${props.name}/${props.tabNumber}`} href={`/registration?name=${props.name}&tabNumber=${props.tabNumber}`}>
      <a>{props.name}</a>
    </Link>
  </li>
);

const ContentMenuTabs = () => (
  <div className='menu-tabs'>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <MaskedRegistrationLink name='member' tabNumber='1'/>
        <MaskedRegistrationLink name='identity' tabNumber='1'/>
        <MaskedRegistrationLink name='account' tabNumber='1'/>
        <MaskedRegistrationLink name='approvals' tabNumber='1'/>
      </ol>
    </nav>

  </div>
);

export default ContentMenuTabs