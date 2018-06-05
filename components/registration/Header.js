/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import IoIosArrowThinLeft from 'react-icons/lib/io/ios-arrow-thin-left';
import logo from '../../static/images/logo.png';

const Header = () => (
  <div className="header">
    <div className="row no-gutters header__block noselect">

      <div className="header__block__left-side">
        <Link href="/">
          <a className="header__block__left-link">
            <IoIosArrowThinLeft size={52} />
            <span>Back</span>
          </a>
        </Link>
      </div>

      <div className="header__block__center">
        <Link href="/">
          <img
            src={logo}
            alt="EMPALA"
            style={{ width: '182px' }}
            className="pointer"
          />
        </Link>
      </div>

      <div className="header__block__right-side">
        <a
          href="#"
          className="header__block__right-link"
        >
            I have an account (Login)
        </a>
      </div>

    </div>
  </div>
);

export default Header;
