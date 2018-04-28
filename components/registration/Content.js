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
          <div className='col-6 relative onboard__left-block menu-items--min-height'>
            <ContentMenu {...props} />
          </div>
          <div className='col-6 onboard__right-block'>

            <div className="onboard__right-block--center">
              <ContentFillingInformation {...props} />
            </div>
            <div className="onboard__right-block--bottom">
              <Button {...props} />
            </div>
          </div>
        </div>
      </div>
    </div>
);
}

export default Content