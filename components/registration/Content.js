import React from 'react';
import ContentMenu from './ContentMenu';
import ContentFillingInfo from './ContentFillingInformation';
import Link from 'next/link';


const NextLink = (props) => (
    <Link as={`/registration/${props.name}/${props.tabNumber}`}
          href={`/registration?name=${props.name}&tabNumber=${props.tabNumber}`}>
      <button> > </button>
    </Link>
);

const  Content = (props) => {
  console.log('content props -->', props)
  return(
    <div className='onboard'>
      <div className='onboard__container'>
        <div className='row no-gutters onboard__container__col'>
          <div className='col-6 relative menu-items--min-height'>
            <ContentMenu {...props} />
          </div>
          <div className='col-6 onboard__right-block'>
            <ContentFillingInfo {...props} />
            <NextLink
              name={ props.url? props.url.query.name : 'member'}
              tabNumber={props.url ? +props.url.query.tabNumber -1 : 1} />
            <NextLink
              name={ props.url? props.url.query.name : 'member'}
              tabNumber={props.url ? +props.url.query.tabNumber +1 : 1} />
          </div>
        </div>
      </div>
    </div>
);
}

export default Content