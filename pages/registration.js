import React from 'react';
import Header from '../components/registration/Header';
import Content from '../components/registration/Content';
import Footer from '../components/registration/Footer';
import stylesheet from '../assets/styles/main.scss'


const Registration = (props) => {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
      <Header />
      <Content {...props} />
      <Footer />


    </div>
  )
};

export default Registration;