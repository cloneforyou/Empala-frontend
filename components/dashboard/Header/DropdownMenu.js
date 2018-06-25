import React from 'react';
import { connect } from 'react-redux';
import { Link } from '../../../routes';
import avatar from '../../../static/images/default-avatar-of-user.svg';
import { logout, setActivePage } from '../../../actions/dashboard';
import { changeActiveTabProfile } from '../../../actions/profile';

const DropdownMenu = (props) => {
  const { menuAvatarShow } = props;

  this.handlerClick = (tab) => {
    props.changeActiveTabProfile(tab);
    props.setActivePage('profile');
    props.closeMenu();
  };

  return (
    <div
      className={(menuAvatarShow === false) ?
        'dropdown-menu dropdown-menu-right profile-menu user-nav__dropdown-menu' :
        'dropdown-menu dropdown-menu-right show profile-menu user-nav__dropdown-menu'}
    >
      <div className="profile-menu__head">
        <div className="profile-menu__avatar-wrap">
          <img
            className={props.userPic ? 'profile-menu__avatar' : 'profile-menu__avatar profile-menu__avatar_bordered'}
            src={props.userPic || avatar}
            alt="Avatar"
          />
        </div>
        <div className="profile-menu__user-info">
          <h4>Iain Clarke</h4>
          <h4>Member No: 1234567890</h4>
        </div>
      </div>
      <h3 className="profile-menu__title">Membership settings</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <button onClick={() => {
            this.handlerClick(0);
          }}
          >
            <Link route="dashboard" params={{ page: 'profile' }}>
              <span>Membership</span>
            </Link>
          </button>
        </li>
        <li className="profile-menu__item">
          <button onClick={() => {
            this.handlerClick(1);
          }}
          >
            <Link route="dashboard" params={{ page: 'profile' }}>
              <span>Regulatory</span>
            </Link>
          </button>
        </li>
        <li className="profile-menu__item">
          <button onClick={() => {
            this.handlerClick(2);
          }}
          >
            <Link route="dashboard" params={{ page: 'profile' }}>
              <span>Investment Experience</span>
            </Link>
          </button>
        </li>
        <li className="profile-menu__item">
          <button onClick={() => {
            this.handlerClick(3);
          }}
          >
            <Link route="dashboard" params={{ page: 'profile' }}>
              <span>Accounts</span>
            </Link>
          </button>
        </li>
      </ul>
      <h3 className="profile-menu__title">Account Statements</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <button onClick={() => {
            this.handlerClick(4);
          }}
          >
            <Link route="dashboard" params={{ page: 'profile' }}>
              <span>Documents</span>
            </Link>
          </button>
        </li>
      </ul>
      <h3 className="profile-menu__title">Platform Configuration</h3>
      <ul className="profile-menu__list">
        <li className="profile-menu__item">
          <button onClick={() => {
            this.handlerClick(5);
          }}
          >
            <Link route="dashboard" params={{ page: 'profile' }}>
              <span>Order Mgt Defaults</span>
            </Link>
          </button>
        </li>
        <li className="profile-menu__item">
          <button onClick={() => {
            this.handlerClick(6);
          }}
          >
            <Link route="dashboard" params={{ page: 'profile' }}>
              <span>Notifications</span>
            </Link>
          </button>
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
      changeActiveTabProfile: value => dispatch(changeActiveTabProfile(value)),
      setActivePage: page => dispatch(setActivePage(page)),
    }
  ),
)(DropdownMenu);
