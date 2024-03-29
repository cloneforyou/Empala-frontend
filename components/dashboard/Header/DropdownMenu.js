import React from 'react';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '../../../routes';
import avatar from '../../../static/images/default-avatar-of-user.svg';
import { logout, setActivePage } from '../../../actions/dashboard';
import { changeActiveTabProfile } from '../../../actions/profile';


const DropdownMenu = (props) => {

  const { anchorEl, currentColorScheme } = props;

  this.handlerClick = (tab) => {
    props.setActivePage('profile');
    props.changeActiveTabProfile(tab);
    props.handleClose();
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={props.handleClose}
      PaperProps={{
        style: {
          marginTop: '55px',
          background: 'transparent',
        },
      }}
      MenuListProps={{
        style: {
          padding: 0,
        },
      }}
    >
      <div className={`profile-menu user-nav__dropdown-menu profile-menu_${currentColorScheme}`}>
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
          <li
            className="profile-menu__item"
            onClick={() => this.handlerClick(0)}
          >
            <Link
              route="dashboard"
              params={{ page: 'profile' }}
            >
              Membership
            </Link>
          </li>
          <li
            className="profile-menu__item"
            onClick={() => this.handlerClick(1)}
          >
            <Link
              route="dashboard"
              params={{ page: 'profile' }}
            >
              Regulatory
            </Link>
          </li>
          <li
            className="profile-menu__item"
            onClick={() => this.handlerClick(2)}
          >
            <Link
              route="dashboard"
              params={{ page: 'profile' }}
            >
              Investment Experience
            </Link>
          </li>
          {/*<li*/}
            {/*className="profile-menu__item"*/}
            {/*onClick={() => this.handlerClick(3)}*/}
          {/*>*/}
            {/*<Link*/}
              {/*route="dashboard"*/}
              {/*params={{ page: 'profile' }}*/}
            {/*>*/}
              {/*Accounts*/}
            {/*</Link>*/}
          {/*</li>*/}
        </ul>
        <h3 className="profile-menu__title">Account Statements</h3>
        <ul className="profile-menu__list">
          <li
            className="profile-menu__item"
            onClick={() => this.handlerClick(3)}
          >
            <Link
              route="dashboard"
              params={{ page: 'profile' }}
            >
              Documents
            </Link>
          </li>
        </ul>
        <h3 className="profile-menu__title">Platform Configuration</h3>
        <ul className="profile-menu__list">
          <li
            className="profile-menu__item"
            onClick={() => this.handlerClick(4)}
          >
            <Link
              route="dashboard"
              params={{ page: 'profile' }}
            >
              Application Settings
            </Link>
          </li>
          <li
            className="profile-menu__item"
            onClick={() => this.handlerClick(5)}
          >
            <Link
              route="dashboard"
              params={{ page: 'profile' }}
            >
              Notifications
            </Link>
          </li>
        </ul>
        <button
          className="profile-menu__logout-btn"
          onClick={props.logout}
        >Sign Out
        </button>
      </div>

    </Menu>

  );
};

DropdownMenu.propTypes = {
  menuAvatarShow: PropTypes.bool,
  changeActiveTabProfile: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  closeMenu: PropTypes.func,
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
