import React from 'react';
import ContentMenu from './ContentMenu';

const  Content = (props) => {
  console.log('content props -->', props)
  return(
    <div className='onboard'>
      <div className='onboard__container'>
        <div className='row no-gutters onboard__container__col'>
          <div className='col-6'>
            <ContentMenu {...props} />
          </div>
          <div className='col-6 onboard__right-block'>
          </div>
        </div>
      </div>
    </div>
);
}

export default Content