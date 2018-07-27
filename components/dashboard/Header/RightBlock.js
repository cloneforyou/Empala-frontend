import React, { Component } from 'react';
import DropdownMenu from './DropdownMenu';
import avatar from '../../../static/images/default-avatar-of-user.svg';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { userPic, loading } = this.props;
    const { menuAvatarShow, anchorEl } = this.state;
    return (
      <div>
        <ul className="nav user-nav align-items-center">
          <li className="nav-item">
            <a className="nav-link user-nav__link" href="#">
              <i className="user-nav__icon user-nav__icon_chat" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link user-nav__link" href="#">
              <i className="user-nav__icon user-nav__icon_notification" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link user-nav__link" href="#">
              <i className="user-nav__icon user-nav__icon_wallet" />
            </a>
          </li>
          <li className="nav-item dropdown">
            <button
              className={menuAvatarShow ? "nav-link user-nav__dropdown-btn user-nav__dropdown-btn_open" : "nav-link user-nav__dropdown-btn"}
              // onClick={this.toggleMenu}
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <span className="user-nav__text-btn">me</span>
              {
                !loading &&
                <div className={userPic ?
                  'user-nav__avatar-wrap' :
                  "user-nav__avatar-wrap  user-nav__avatar-wrap_bordered"}
                >
                  <img
                    className="user-nav__userPic"
                    src={userPic || avatar}
                    alt="Avatar"
                  />
                </div>

              }
            </button>
            {/*<Menu*/}
            {/*id="simple-menu"*/}
            {/*anchorEl={anchorEl}*/}
            {/*open={Boolean(anchorEl)}*/}
            {/*onClose={this.handleClose}*/}
            {/*// className={(menuAvatarShow === false) ?*/}
            {/*//   'dropdown-menu dropdown-menu-right profile-menu user-nav__dropdown-menu' :*/}
            {/*//   'dropdown-menu dropdown-menu-right show profile-menu user-nav__dropdown-menu'}*/}
            {/*>*/}
            {/*<div className="profile-menu__head">*/}
            {/*<div className="row no-gutters align-items-center">*/}
            {/*<div className="profile-menu__avatar-wrap"*/}
            {/*onClick={this.handleClose}*/}
            {/*>*/}
            {/*<img*/}
            {/*className={userPic ? 'profile-menu__avatar' : 'profile-menu__avatar profile-menu__avatar_bordered'}*/}
            {/*src={userPic || avatar}*/}
            {/*alt="Avatar"*/}
            {/*/>*/}
            {/*</div>*/}
            {/*<h4 className="profile-menu__user-info-name">{props.memberFullName}</h4>*/}
            {/*</div>*/}
            {/*<h4 className="profile-menu__user-info-member-no">Member No: </h4>*/}
            {/*</div>*/}
            {/*<h3 className="profile-menu__title">Membership settings</h3>*/}
            {/*<ul className="profile-menu__list">*/}
            {/*<li*/}
            {/*className="profile-menu__item"*/}
            {/*onClick={() => this.handlerClick(0)}*/}
            {/*>*/}
            {/*<Link*/}
            {/*route="dashboard"*/}
            {/*params={{ page: 'profile' }}*/}
            {/*>*/}
            {/*Membership*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*<li*/}
            {/*className="profile-menu__item"*/}
            {/*onClick={() => this.handlerClick(1)}*/}
            {/*>*/}
            {/*<Link*/}
            {/*route="dashboard"*/}
            {/*params={{ page: 'profile' }}*/}
            {/*>*/}
            {/*Regulatory*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*<li*/}
            {/*className="profile-menu__item"*/}
            {/*onClick={() => this.handlerClick(2)}*/}
            {/*>*/}
            {/*<Link*/}
            {/*route="dashboard"*/}
            {/*params={{ page: 'profile' }}*/}
            {/*>*/}
            {/*Investment Experience*/}
            {/*</Link>*/}
            {/*</li>*/}
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
            {/*</ul>*/}
            {/*<h3 className="profile-menu__title">Account Statements</h3>*/}
            {/*<ul className="profile-menu__list">*/}
            {/*<li*/}
            {/*className="profile-menu__item"*/}
            {/*onClick={() => this.handlerClick(4)}*/}
            {/*>*/}
            {/*<Link*/}
            {/*route="dashboard"*/}
            {/*params={{ page: 'profile' }}*/}
            {/*>*/}
            {/*Documents*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*<h3 className="profile-menu__title">Platform Configuration</h3>*/}
            {/*<ul className="profile-menu__list">*/}
            {/*<li*/}
            {/*className="profile-menu__item"*/}
            {/*onClick={() => this.handlerClick(5)}*/}
            {/*>*/}
            {/*<Link*/}
            {/*route="dashboard"*/}
            {/*params={{ page: 'profile' }}*/}
            {/*>*/}
            {/*Application Settings*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*<li*/}
            {/*className="profile-menu__item"*/}
            {/*onClick={() => this.handlerClick(6)}*/}
            {/*>*/}
            {/*<Link*/}
            {/*route="dashboard"*/}
            {/*params={{ page: 'profile' }}*/}
            {/*>*/}
            {/*Notifications*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*<button*/}
            {/*className="profile-menu__logout-btn"*/}
            {/*// onClick={props.logout}*/}
            {/*>Sign Out*/}
            {/*</button>*/}
            {/*</Menu>*/}
            <DropdownMenu
              {...this.props}
              closeMenu={this.closeMenu}
              userPic={userPic}
              anchorEl={anchorEl}
              handleClose={this.handleClose}
            />
          </li>
          {/*<li>*/}
          {/*<div>*/}
          {/*<Button*/}
          {/*aria-owns={anchorEl ? 'simple-menu' : null}*/}
          {/*aria-haspopup="true"*/}
          {/*onClick={this.handleClick}*/}
          {/*>*/}
          {/*Open Menu*/}
          {/*</Button>*/}
          {/*<Menu*/}
          {/*id="simple-menu"*/}
          {/*anchorEl={anchorEl}*/}
          {/*open={Boolean(anchorEl)}*/}
          {/*onClose={this.handleClose}*/}
          {/*>*/}
          {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>*/}
          {/*<MenuItem onClick={this.handleClose}>My account</MenuItem>*/}
          {/*<MenuItem onClick={this.handleClose}>Logout</MenuItem>*/}
          {/*</Menu>*/}
          {/*</div>*/}
          {/*</li>*/}
        </ul>
      </div>
    )
  }
}
