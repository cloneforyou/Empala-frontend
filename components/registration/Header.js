import React from "react";
import IoIosArrowThinLeft from 'react-icons/lib/io/ios-arrow-thin-left';
import logo from '../../assets/img/logo.png';

const Header = () => (
    <div className='header'>
      <div className='row no-gutters header__block'>

        <div className='header__block__left-side'>
          <a href='#'
             className="header__block__left-link">
            <IoIosArrowThinLeft size={52} />
            <span>Back</span>
          </a>
        </div>

        <div className='header__block__center'>
          <a href='#'>
            <img src={logo}
                 alt="EMPALA"
                 style={{ width: '182px' }}
            />
          </a>
        </div>

        <div className='header__block__right-side'>
          <a href='#'
             className="header__block__right-link">
            I have an account (Login)
          </a>
        </div>

      </div>
    </div>
);

export default Header