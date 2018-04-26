import React from 'react';
import RegistrationContentMenuItems from '../../components/registration/RegistrationContentMenuItems';
import stylesheet from '../../assets/styles/main.scss'


const MemberPage = () => {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
      <RegistrationContentMenuItems name={'member'} />
    </div>
  )
};

export default MemberPage;