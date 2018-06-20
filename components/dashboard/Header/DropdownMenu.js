import React from 'react';
import { connect } from 'react-redux';
import { Link } from '../../../routes';
import avatar from '../../../static/images/avatar-user.svg';
import { logout, setActivePage } from '../../../actions/dashboard';
import { changeActiveTabProfile } from '../../../actions/profile';

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
        <li className="profile-menu__item">
          <a href="" onClick={() => { props.changeActiveTabProfile(0); props.setActivePage('profile'); }}>
            <Link route="dashboard" params={{ page: 'profile' }}>Membership</Link>
          </a>
        </li>
        <li className="profile-menu__item">
          <a href="" onClick={() => { props.changeActiveTabProfile(1); props.setActivePage('profile'); }}>
             <Link route="dashboard" params={{ page: 'profile' }}>Regulatory</Link>
          </a>
        </li>
        <li className="profile-menu__item">
          <a href="" onClick={() => { props.changeActiveTabProfile(2); props.setActivePage('profile'); }}>
            <Link route="dashboard" params={{ page: 'profile' }}>Investment Experience</Link>
          </a>
        </li>
        <li className="profile-menu__item">
          <a href="" onClick={() => { props.changeActiveTabProfile(3); props.setActivePage('profile'); }}>
            <Link route="dashboard" params={{ page: 'profile' }}>Accounts</Link>
          </a>
        </li>
      </ul>
      <h3 className="profile-menu__title">Account Statements</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <a href="" onClick={() => { props.changeActiveTabProfile(4); props.setActivePage('profile'); }}>
            <Link route="dashboard" params={{ page: 'profile' }}>Documents</Link>
          </a>
        </li>
      </ul>
      <h3 className="profile-menu__title">Platform Configuration</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <a href="" onClick={() => { props.changeActiveTabProfile(5); props.setActivePage('profile'); }}>
            <Link route="dashboard" params={{ page: 'profile' }}>Order Mgt Defaults</Link>
          </a>
        </li>
        <li className="profile-menu__item">
          <a href="" onClick={() => { props.changeActiveTabProfile(6); props.setActivePage('profile'); }}>
            <Link route="dashboard" params={{ page: 'profile' }}>Notifications</Link>
          </a>
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
export default connect(
  state => ({}),
  dispatch => (
    {
      logout: () => dispatch(logout()),
      changeActiveTabProfile: (value) => dispatch(changeActiveTabProfile(value)),
      setActivePage: (page) => dispatch(setActivePage(page)),
    }
  ),
)(DropdownMenu);
