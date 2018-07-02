import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '../../../routes';
import avatar from '../../../static/images/default-avatar-of-user.svg';
import { logout, setActivePage } from '../../../actions/dashboard';
import { changeActiveTabProfile } from '../../../actions/profile';

const DropdownMenu = (props) => {
  const { menuAvatarShow } = props;

  this.handlerClick = (tab) => {
    props.setActivePage('profile');
    props.changeActiveTabProfile(tab);
    props.closeMenu();
  };

  return (
    <div
      className={(menuAvatarShow === false) ?
        'dropdown-menu dropdown-menu-right profile-menu user-nav__dropdown-menu' :
        'dropdown-menu dropdown-menu-right show profile-menu user-nav__dropdown-menu'}
    >
      <div className="profile-menu__head">
        <div className="row no-gutters align-items-center">
          <div className="profile-menu__avatar-wrap">
            <img
              className={props.userPic ? 'profile-menu__avatar' : 'profile-menu__avatar profile-menu__avatar_bordered'}
              src={props.userPic || avatar}
              alt="Avatar"
            />
          </div>
          <h4 className="profile-menu__user-info-name">{props.memberFullName}</h4>
        </div>
        <h4 className="profile-menu__user-info-member-no">Member No: {props.memberNumber}</h4>
      </div>
      <h3 className="profile-menu__title">Membership settings</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <Link route="dashboard" params={{ page: 'profile' }} className="profile-menu__link" onClick={() => this.handlerClick(0)}>Membership</Link>
        </li>
        <li className="profile-menu__item">
          <button className="profile-menu__link" onClick={() => this.handlerClick(1)}>Regulatory</button>
        </li>
        <li className="profile-menu__item">
          <button className="profile-menu__link" onClick={() => this.handlerClick(2)}>Investment Experience</button>
        </li>
        <li className="profile-menu__item">
          <button className="profile-menu__link" onClick={() => this.handlerClick(3)}>Accounts</button>
        </li>
      </ul>
      <h3 className="profile-menu__title">Account Statements</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <button className="profile-menu__link" onClick={() => this.handlerClick(4)}>Documents</button>
        </li>
      </ul>
      <h3 className="profile-menu__title">Platform Configuration</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <button className="profile-menu__link" onClick={() => this.handlerClick(5)}>Order Mgt Defaults</button>
        </li>
        <li className="profile-menu__item">
          <button className="profile-menu__link" onClick={() => this.handlerClick(6)}>Notifications</button>
        </li>
      </ul>
      <button
        className="profile-menu__logout-btn"
        onClick={props.logout}
      >Sign Out
      </button>
    </div>
  );
};

DropdownMenu.propTypes = {
  menuAvatarShow: PropTypes.bool.isRequired,
  changeActiveTabProfile: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  state => ({}),
  dispatch => (
    {
      logout: () => dispatch(logout()),
      changeActiveTabProfile: value => dispatch(changeActiveTabProfile(value)),
      setActivePage: page => dispatch(setActivePage(page)),
    }
  ),
)(DropdownMenu);
