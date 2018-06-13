import React from 'react';
import { connect } from 'react-redux';
import avatar from '../../../static/images/avatar-user.svg';
import { logout } from '../../../actions/dashboard';

const DropdownMenu = (props) => {
  const { menuAvatarShow } = props;
  return (
    <div
      className={(menuAvatarShow === false) ?
        'dropdown-menu dropdown-menu-right profile-menu user-nav__dropdown-menu' :
        'dropdown-menu dropdown-menu-right show profile-menu user-nav__dropdown-menu'}
    >
      <div className="profile-menu__head">
        <div className="profile-menu__avatar">
          <img src={avatar} alt="" />
        </div>
        <div className="profile-menu__user-info">
          <h4>Iain Clarke</h4>
          <h4>Member No: 1234567890</h4>
        </div>
      </div>
      <h3 className="profile-menu__title">Membership settings</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item"><a href="">Membership</a></li>
        <li className="profile-menu__item"><a href="">Regulatory</a></li>
        <li className="profile-menu__item"><a href="">Investment Experience</a></li>
        <li className="profile-menu__item"><a href="">Accounts</a></li>
      </ul>
      <h3 className="profile-menu__title">Account Statements</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item"><a href="">Documents</a></li>
      </ul>
      <h3 className="profile-menu__title">Platform Configuration</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item"><a href="">Order Mgt Defaults</a></li>
        <li className="profile-menu__item"><a href="">Notifications</a></li>
      </ul>
      <button
        className="profile-menu__logout-btn"
        onClick={props.logout}
      >Sign Out
      </button>
    </div>
  );
};
export default connect(
  state => ({}),
  dispatch => (
    {
      logout: () => dispatch(logout()),
    }
  ),
)(DropdownMenu);
