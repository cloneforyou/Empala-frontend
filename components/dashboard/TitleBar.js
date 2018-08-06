import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    currentPage: state.dashboard.activePageDashboard,
  };
}

function TitleBar(props) {
  return (
    <div className="titlebar">
      {props.currentPage && (props.currentPage !== 'global portfolio') && (props.currentPage !== 'account funding') &&
      <div className="d-flex">
          <span>
          <i className={`titlebar__icon titlebar__icon_${props.currentPage}`}></i>
         </span>
        <span className="titlebar__title">{props.currentPage}</span>
      </div>}

      {props.currentPage && (props.currentPage === 'global portfolio') &&
      <div className="d-flex">
          <span>
          <i className="titlebar__icon titlebar__icon_wallet"></i>
            {props.iconAccountTitleBar && <i className={`titlebar__icon titlebar__icon_flag-${props.iconAccountTitleBar}`}></i>}
        </span>
        <span className="titlebar__title">{props.currentSectionTitleBar}</span>
      </div>}

      {props.currentPage && (props.currentPage === 'account funding') &&
      <div className="d-flex">
          <span>
          <i className="titlebar__icon titlebar__icon_wallet"></i>
            {props.iconAccountTitleBar && <i className={`titlebar__icon titlebar__icon_flag-${props.iconAccountTitleBar}`}></i>}
        </span>
        <span className="titlebar__title">{props.currentPage}</span>
      </div>}
    </div>
  );
}

TitleBar.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TitleBar);
