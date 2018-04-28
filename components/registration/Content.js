import React from 'react';
import ContentMenu from './ContentMenu';
import ContentFillingInformation from './ContentFillingInformation';
import Button from './Button';

const  Content = (props) => {
  console.log('content props -->', props)
  return(
    <div className='onboard'>
      <div className='onboard__container'>
        <div className='row no-gutters onboard__container__col'>
          <div className='col-6 onboard__left-block'>
            <ContentMenu {...props} />
          </div>
          <div className='col-6 onboard__right-block'>
            <ContentFillingInformation />
            <Button />
          </div>
        </div>
      </div>
    </div>
);
}

export default Content