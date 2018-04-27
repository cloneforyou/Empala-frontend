import React from 'react';
import RegistrationContentMenuItems from '../components/registration/RegistrationContentMenuItems';
import ContentMenu from '../components/registration/ContentMenu';
import stylesheet from '../assets/styles/main.scss'


const RegistrationPage = (props) => {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
      <ContentMenu {...props} />
    </div>
  )
};

export default RegistrationPage;