import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Icons from '../../constants/Icons';
import DashboardIcon from './DashboardIcon';


function mapStateToProps(state) {
  return {
    currentPage: state.dashboard.activePageDashboard,
  };
}

const propTypes = {
  currentPage: PropTypes.string.isRequired,
  iconAccountTitleBar: PropTypes.string,
  currentSectionTitleBar: PropTypes.string,
};

const defaultProps = {
  iconAccountTitleBar: null,
  currentSectionTitleBar: null,
};

function TitleBar({ currentPage, iconAccountTitleBar, currentSectionTitleBar }) {
  const titleBarIcon = `icon${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`;

  return (
    <div className="titlebar">
      {currentPage && (currentPage !== 'global portfolio') && (currentPage !== 'funding' && currentPage !== 'market') &&
      <div className="d-flex">
        <span>
          <DashboardIcon
            name={Icons[titleBarIcon].id}
            viewBox={Icons[titleBarIcon].viewBox}
            className="titlebar__icon"
          />
        </span>
        <span className="titlebar__title">{currentPage}</span>
      </div>}

      {currentPage && (currentPage === 'global portfolio') &&
      <div className="d-flex">
        <span>
          <DashboardIcon
            name={Icons.iconWallet.id}
            viewBox={Icons.iconWallet.viewBox}
            className="titlebar__icon"
          />
          {iconAccountTitleBar &&
          <i className={`titlebar__icon-country_flag-${iconAccountTitleBar}`} />}
        </span>
        <span className="titlebar__title">{currentSectionTitleBar}</span>
      </div>}

      {currentPage && (currentPage === 'funding' || currentPage === 'market') &&
      <div className="d-flex">
        <span>
          <DashboardIcon
            name={Icons.iconWallet.id}
            viewBox={Icons.iconWallet.viewBox}
            className="titlebar__icon"
          />
        </span>
        <span className="titlebar__title">{currentPage}</span>
      </div>}
    </div>
  );
}

TitleBar.propTypes = propTypes;
TitleBar.defaultProps = defaultProps;

export default connect(mapStateToProps)(TitleBar);
