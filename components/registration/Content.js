import React from 'react';
import ContentMenu from './ContentMenu';
import ContentFillingInformation from './ContentFillingInformation';
import Button from './NavButtons';
import ContentMenuTabs from './ContentMenuTabs';
import ContentMenuItems from './ContentMenuItems';

const  Content = (props) => {

  return(
    <div className='onboard'>
      <div className='onboard__container'>
        <div className='row no-gutters onboard__col'>

          <div className='col-6 onboard__left-block'>
            <div className="onboard__left-block--top">
              <ContentMenuTabs />
            </div>
            <div className="onboard__left-block--center">
             <ContentMenuItems {...props} />
            </div>
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