import React from "react";
import IoIosArrowThinLeft from 'react-icons/lib/io/ios-arrow-thin-left';
import logo from '../../assets/img/logo.png';

const Header = () => (
    <div className='header'>
      <div className='row no-gutters header__block'>
        <a href='#'
           className="header__block__left-link">
          <IoIosArrowThinLeft size={52} />
          <span>Back</span>
        </a>
        <a href='#' >
          <img src={logo} alt="empala_logo" style={{width: '182px'}}/>
          {/*todo remove style when actual logo*/}
        </a>
        <a href='#'
           className="header__block__right-link">I have an account (Login)</a>
      </div>
    </div>
);

export default Header