import React from 'react';
import RegistrationContentMenuItems from '../../components/registration/RegistrationContentMenuItems';
import stylesheet from '../../assets/styles/main.scss'


const MemberPage = (props) => {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
      <RegistrationContentMenuItems name={'props.url.'} />
    </div>
  )
};

export default MemberPage;