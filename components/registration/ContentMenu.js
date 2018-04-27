import React from "react";
import ContentMenuTabs from './ContentMenuTabs';
import ContentMenuItems from './ContentMenuItems';


const ContentMenu = (props) => (
  <div className=''>
    <ContentMenuTabs />
    <ContentMenuItems {...props} />

  </div>
);

export default ContentMenu