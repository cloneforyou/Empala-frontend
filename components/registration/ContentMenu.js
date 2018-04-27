import React from "react";
import ContentMenuTabs from './ContentMenuTabs';
import RegistrationContentMenuItems from './RegistrationContentMenuItems';


const ContentMenu = (props) => (
  <div className=''>
    <ContentMenuTabs />
    <RegistrationContentMenuItems {...props} />

  </div>
);

export default ContentMenu