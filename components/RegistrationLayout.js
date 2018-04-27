import React, {Component} from 'react'
import Header from './registration/Header';
import Content from './registration/Content';
import Footer from './registration/Footer';
import stylesheet from '../assets/styles/main.scss';


class RegistrationLayout extends Component {

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <Header />
        <Content />
        <Footer />
      </div>
    )
  }
}

export default RegistrationLayout;